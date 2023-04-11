export default {
    login: (req, res) => {
        const {user, password} = req.body
        console.log(user, password)
        res.json({
            "data": [{id: 1, name: "Ahmed Hesham", type: "Admin", token: "123456789"}],
            "message": "Success"
        })
    }
}