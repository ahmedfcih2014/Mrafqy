import CustomerRepo from "../../repositories/CustomerRepo.js";
import InvoiceRepo from "../../repositories/InvoiceRepo.js";
import ServicesRepo from "../../repositories/ServicesRepo.js";
import WalletRepo from "../../repositories/WalletRepo.js";

export default {
    dashboard: async (req, res) => {
        const customerId = req.params.customerId
        const limit = req.query.per_page ? req.query.per_page : 10
        const page = req.query.page ? req.query.page : 1

        try {
            const customers = await CustomerRepo.lastCustomers(5);
            console.log(1)
            const walletTransactions = await WalletRepo.lastTransactions(5);
            console.log(2)
            const invoices = await InvoiceRepo.lastServices(5);
            console.log(3)
            
            res.json({
                "data": {
                    customers: customers,
                    transactions: walletTransactions,
                    invoices: invoices,
                    counters: {
                        customers: await CustomerRepo.customersCount(),
                        services: await ServicesRepo.servicesCount(),
                        total_balance: await WalletRepo.totalBalances()
                    }
                },
                "message": "Success"
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({"data": {}, "message": "Something went wrong", "error": err})
        }
    }
}