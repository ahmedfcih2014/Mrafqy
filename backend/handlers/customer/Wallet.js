import CustomerRepo from "../../repositories/CustomerRepo.js"
import WalletRepo from "../../repositories/WalletRepo.js"

export default {
    transferWallet: async (req, res) => {
        const {transfer_phone, amount, password, reason} = req.body
        const sourceCustomer = req.customer
        
        try {
            if (sourceCustomer.password != password) throw "Enter a valid password for this transfer"

            const destinationCustomer = await CustomerRepo.getByPhone(transfer_phone)

            await WalletRepo.transfer(sourceCustomer, destinationCustomer, amount, reason)

            res.json({
                "data": {},
                "message": "Success"
            })
        } catch(err) {
            res.status(400)
            .json({
                "data": {},
                "message": "Can`t transfer in current time",
                "err": err
            })
        }
    },
    transfers: async (req, res) => {
        try {
            const limit = req.query.per_page ? req.query.per_page : 10
            const page = req.query.page ? req.query.page : 1

            const customer = req.customer
            const transfers = await WalletRepo.getTransfers(customer.id, limit, page)

            res.json({
                "data": {
                    "transfers": transfers.rows,
                    "count": transfers.count,
                },
                "message": "Success"
            })
        } catch (err) {
            res.status(400)
            .json({
                "data": {},
                "message": "Can`t get transfers in current time",
                "err": err
            })
        }
    },
    showTransfer: async (req, res) => {
        try {
            const transfer = await WalletRepo.showTransfer(req.customer.id, req.params.id)

            res.json({
                "data": transfer,
                "message": "Success"
            })
        } catch (err) {
            res.status(400)
            .json({
                "data": {},
                "message": "Can`t get transfer in current time",
                "err": err
            })
        }
    },
}