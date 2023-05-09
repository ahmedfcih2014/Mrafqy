import ServicesRepo from "../../repositories/ServicesRepo.js"
import WalletRepo from "../../repositories/WalletRepo.js"

export default {
    getHome: async (req, res) => {
        try {
            const customer = req.customer

            const wallet = await WalletRepo.showByCustomerId(customer.id)
            const transactions = await WalletRepo.getTransactionsList(wallet.id, 5, 1)
            const services = await ServicesRepo.getServices(3)

            res.json({
                "data": {
                    transactions: transactions.rows,
                    services: services,
                    balance: wallet.balance,
                },
                "message": "Success"
            })
        } catch (err) {
            res.status(400)
            .json({
                "data": {},
                "message": "Can`t get home in current time",
                "err": err
            })
        }
    },
}