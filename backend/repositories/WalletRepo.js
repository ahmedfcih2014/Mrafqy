import pgPool from "./Connection.js"

export default {
    walletWithdraw: async (customerId, amount, note) => {
        const dbClient = await pgPool.connect()

        try {
            await dbClient.query('BEGIN')
            
            const walletResult = await dbClient.query("SELECT * FROM wallets WHERE customer_id = $1 FOR UPDATE", [customerId])
            if (walletResult.rowCount <= 0) throw "Wallet Not Found"
            
            const wallet = walletResult.rows[0]
            if (wallet.balance < amount) throw "Not enough balance for withdraw operation"

            const now = new Date()
            await dbClient.query(
                "INSERT INTO wallet_transactions (wallet_id, amount, type, note, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)",
                [
                    wallet.id,
                    amount,
                    'out',
                    note ? note : null,
                    now,
                    now
                ]
            )
            const balance = wallet.balance - amount
            await dbClient.query("UPDATE wallets SET balance = $1 WHERE id = $2", [balance, wallet.id])
            
            await dbClient.query('COMMIT')
        } catch (e) {
            await dbClient.query('ROLLBACK')
            throw e
        } finally {
            dbClient.release()
        }
    },
    walletDeposit: async (customerId, amount, note) => {
        const dbClient = await pgPool.connect()

        try {
            await dbClient.query('BEGIN')
            
            const walletResult = await dbClient.query("SELECT * FROM wallets WHERE customer_id = $1", [customerId])
            if (walletResult.rowCount <= 0) throw "Wallet Not Found"
            
            const wallet = walletResult.rows[0]
            
            const now = new Date()
            await dbClient.query(
                "INSERT INTO wallet_transactions (wallet_id, amount, type, note, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)",
                [
                    wallet.id,
                    amount,
                    'in',
                    note ? note : null,
                    now,
                    now
                ]
            )
            const balance = wallet.balance + amount
            await dbClient.query("UPDATE wallets SET balance = $1 WHERE id = $2", [balance, wallet.id])
            
            await dbClient.query('COMMIT')
        } catch (e) {
            await dbClient.query('ROLLBACK')
            throw e
        } finally {
            dbClient.release()
        }
    },
    showByCustomerId: async (customerId) => {
        const result = await pgPool.query("SELECT * FROM wallets WHERE customer_id = $1", [customerId])
        if (result.rowCount <= 0) throw "Wallet Not Found"

        return result.rows[0]
    },
    getTransactionsList: async (walletId, limit, page) => {
        const offset = limit * (page - 1)

        const result = await pgPool.query("SELECT * FROM wallet_transactions where wallet_id = $1 order by id desc limit $2 offset $3", [walletId, limit, offset])

        const countResult = await pgPool.query("SELECT COUNT(id) as count FROM wallet_transactions where wallet_id = $1", [walletId])

        return {
            rows: result.rows,
            count: countResult.rows[0].count
        }
    },
    lastTransactions: async (limit) => {
        const select = [
            "wallet_transactions.amount as transaction_amount",
            "wallet_transactions.type as transaction_type",
            "wallet_transactions.note as transaction_note",
            "customers.name as customer_name",
        ]
        const result = await pgPool.query(
            `SELECT ${select.join(",")}
            FROM wallet_transactions
            JOIN wallets ON wallet_transactions.wallet_id = wallets.id
            JOIN customers ON wallets.customer_id = customers.id
            ORDER BY wallet_transactions.id DESC limit $1`,
            [limit]
        )

        return result.rows
    },
    totalBalances: async () => {
        const balanceResult = await pgPool.query("SELECT SUM(balance) as total_balance FROM wallets")
        return balanceResult.rows[0].total_balance
    },
    transfer: async (sourceCustomer, destinationCustomer, amount ,note) => {
        const dbClient = await pgPool.connect()

        try {
            await dbClient.query('BEGIN')
            
            const sourceWalletResult = await dbClient.query("SELECT * FROM wallets WHERE customer_id = $1 FOR UPDATE", [sourceCustomer.id])
            if (sourceWalletResult.rowCount <= 0) throw "Source Wallet Not Found"
            const sourceWallet = sourceWalletResult.rows[0]
            
            const destinationWalletResult = await dbClient.query("SELECT * FROM wallets WHERE customer_id = $1 FOR UPDATE", [destinationCustomer.id])
            if (destinationWalletResult.rowCount <= 0) throw "Destination Wallet Not Found"
            const destinationWallet = sourceWalletResult.rows[0]

            if (sourceWallet.balance < amount) throw "Not enough balance for transfer operation"

            const now = new Date()
            await dbClient.query(
                "INSERT INTO wallet_transactions (wallet_id, amount, type, note, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)",
                [sourceWallet.id, amount, 'out', `transfer ${amount} to ${destinationCustomer.phone}, ${note}`, now, now]
            )
            const sourceBalance = sourceWallet.balance - amount
            await dbClient.query("UPDATE wallets SET balance = $1 WHERE id = $2", [sourceBalance, sourceWallet.id])

            await dbClient.query(
                "INSERT INTO wallet_transactions (wallet_id, amount, type, note, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)",
                [destinationWallet.id, amount, 'in', `receive ${amount} from ${sourceCustomer.phone}, ${note}`, now, now]
            )
            const destinationBalance = destinationWallet.balance - amount
            await dbClient.query("UPDATE wallets SET balance = $1 WHERE id = $2", [destinationBalance, destinationWallet.id])
            
            await dbClient.query(
                "INSERT INTO transfers (source_customer_id, destination_customer_id, amount, reason, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)",
                [sourceCustomer.id, destinationCustomer.id, amount, note, now, now]
            )
            await dbClient.query('COMMIT')
        } catch (e) {
            await dbClient.query('ROLLBACK')
            throw e
        } finally {
            dbClient.release()
        }
        return true
    },
}
