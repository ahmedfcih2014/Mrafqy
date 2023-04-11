const login = (req, res) => {
    res.json({
        "data": [{id: 1, name: "Ahmed Hesham", type: "Customer"}],
        "message": "Success"
    })
}

export default login