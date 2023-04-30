import InvoiceRepo from "../../repositories/InvoiceRepo.js"
import ServicesRepo from "../../repositories/ServicesRepo.js"
import WalletRepo from "../../repositories/WalletRepo.js"

export default {
    getServices: async (req, res) => {
        const limit = req.query.per_page ? req.query.per_page : 10
        const page = req.query.page ? req.query.page : 1

        try {
            const services = await ServicesRepo.getList(limit, page)
            res.json({
                "data": {
                    services: services.rows,
                    total: services.count,
                    current_page: page,
                    per_page: limit
                },
                "message": "Success"
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({"data": {}, "message": "Something went wrong", "error": err})
        }
    },
    show: async (req, res) => {
        try {
            const service = await ServicesRepo.getById(req.params.id)
            
            res.json({
                "data": {
                    id: service.id,
                    name: service.name,
                    price: service.price,
                    icon: service.icon,
                    brief: service.brief,
                },
                "message": "Success"
            })
        } catch(err) {
            res.status(400).json({"data": {}, "message": err})
        }
    },
    buyService: async (req, res) => {
        let isWalletWithdraw = false
        const customer = req.customer

        let service, wallet
        try {
            service = await ServicesRepo.getById(req.body.service_id)
            wallet = await WalletRepo.showByCustomerId(customer.id)
        } catch (err) {
            console.log(1, err)
            res.status(400).json({"data": {}, "message": err})
            return
        }

        try {
            if (wallet.balance < service.price) throw "You haven`t enough balance"

            await WalletRepo.walletWithdraw(customer.id, service.price, `Buy service: ${service.name} ,amount: ${service.price}`)
            isWalletWithdraw = true
            const invoice = await InvoiceRepo.createInvoice(customer.id, service)

            res.json({
                "data": invoice,
                "message": "Success"
            })
        } catch(err) {
            if (isWalletWithdraw) {
                await WalletRepo.walletDeposit(customer.id, service.price, `Refund service: ${service.name} ,amount: ${service.price}`)
            }
            res.status(400).json({"data": {}, "message": err})
        }
    },
}