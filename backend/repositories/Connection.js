import pg from 'pg'
import config from '../config.js'

const pgPool = new pg.Pool(config.db)

export default pgPool
