import {createHmac} from "crypto"
import config from "../config.js"

export default {
    sah256: async (string) => {
        return createHmac('sha256', config.encryptionSecret)
            .update(string)
            .digest('hex')
    }
}