import sha1 from "../libs/sha1.js"
import pgPool from "./Connection.js"

export default {
    adminLogin: async (username, password) => {
        const result = await pgPool.query('SELECT * FROM admins WHERE username = $1 and password = $2', [username, password])
        if (result.rowCount <= 0) throw "Not Found"

        const admin = result.rows[0]
        admin.token = await sha1.sah256(`${admin.id}-${admin.name}-${admin.username}-${Math.random()}`)
        
        await pgPool.query('UPDATE admins SET token = $1 WHERE id = $2', [admin.token, admin.id])
        
        return admin
    },
}
