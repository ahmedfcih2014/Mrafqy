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
}