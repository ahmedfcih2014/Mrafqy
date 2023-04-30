export default {
    generateSerial: length => {
        const chars = "1234567890ABCDEFGHIJKLMNOPQRSTUVXWZabcdefghijklmnopqrstuvxwz"
        let serial = "";
        let count = 0;

        while (count < length) {
            const random = Math.floor(Math.random() * chars.length)
            serial += chars[random]
            count++
        }

        return serial
    }
}