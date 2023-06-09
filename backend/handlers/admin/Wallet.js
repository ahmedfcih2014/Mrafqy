import WalletRepo from "../../repositories/WalletRepo.js"

export default {
    withdraw: async (req, res) => {
        const {customer_id, amount, note} = req.body
        
        try {
            await WalletRepo.walletWithdraw(customer_id, amount, note)
            
            res.json({
                "data": {},
                "message": "Success"
            })
        } catch(err) {
            res.status(400).json({
                "data": {},
                "message": "Withdraw operation failed",
                "error": err
            })
        }
    },
    deposit: async (req, res) => {
        const {customer_id, amount, note} = req.body
        
        try {
            await WalletRepo.walletDeposit(customer_id, amount, note)

            res.json({
                "data": {},
                "message": "Success"
            })
        } catch(err) {
            res.status(400).json({
                "data": {},
                "message": "Deposit operation failed",
                "error": err
            })
        }
    },
    showByCustomer: async (req, res) => {
        const customerId = req.params.customerId
        try {
            const wallet = await WalletRepo.showByCustomerId(customerId)
            res.json({
                "data": {
                    id: wallet.id,
                    customer_id: wallet.customer_id,
                    balance: wallet.balance
                },
                "message": "Success"
            })
        } catch (err) {
            res.status(400).json({
                "data": {},
                "message": "Failed",
                "error": err
            })
        }
    },
    customerTransactions: async (req, res) => {
        const customerId = req.params.customerId
        const limit = req.query.per_page ? req.query.per_page : 10
        const page = req.query.page ? req.query.page : 1

        try {
            const wallet = await WalletRepo.showByCustomerId(customerId)
            const transactions = await WalletRepo.getTransactionsList(wallet.id, limit, page)
            
            res.json({
                "data": {
                    data: transactions.rows,
                    total: transactions.count,
                    current_page: page,
                    per_page: limit,
                },
                "message": "Success"
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({"data": {}, "message": "Something went wrong", "error": err})
        }
    }
}