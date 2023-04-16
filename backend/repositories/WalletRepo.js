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
}
