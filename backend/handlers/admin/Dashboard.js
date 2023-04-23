import CustomerRepo from "../../repositories/CustomerRepo.js";
import InvoiceRepo from "../../repositories/InvoiceRepo.js";
import ServicesRepo from "../../repositories/ServicesRepo.js";
import WalletRepo from "../../repositories/WalletRepo.js";

export default {
    dashboard: async (req, res) => {
        try {
            const customers = await CustomerRepo.lastCustomers(5);
            const walletTransactions = await WalletRepo.lastTransactions(5);
            const invoices = await InvoiceRepo.lastServices(5);
            
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