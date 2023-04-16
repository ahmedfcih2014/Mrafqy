import Validator from 'validatorjs'
import pgPool from '../repositories/Connection.js'

Validator.registerAsync('exists', function(value,  attribute, req, passes) {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column')
    //split table and column
    let attArr = attribute.split(",")
    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`)

    //assign array index 0 and 1 to table and column respectively
    const { 0: table, 1: column } = attArr
    
    //check if incoming value already exists in the database
    // i have injected data direct in query ,because this query will used by code for validation
    // which means in case its have a sql injection will not be public use
    pgPool.query(`SELECT * FROM ${table} WHERE ${column} = '${value}'`)
    .then(result => {
        if (result.rowCount <= 0) {
            passes(false, "You looking for a non exists row at db column: " + column)
            return
        }
        passes()
    })
})

Validator.registerAsync('existsWithoutId', function(value,  attribute, req, passes) {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column')
    //split table and column
    let attArr = attribute.split(",")
    if (attArr.length !== 3) throw new Error(`Invalid format for validation rule on ${attribute}`)

    //assign array index 0 and 1 to table and column respectively
    const { 0: table, 1: column, 2: idValue } = attArr

    //define custom error message
    let msg = (column == "username") ? `${column} has already been taken `: `${column} already in use`
    
    //check if incoming value already exists in the database
    // i have injected data direct in query ,because this query will used by code for validation
    // which means in case its have a sql injection will not be public use
    pgPool.query(`SELECT * FROM ${table} WHERE ${column} = '${value}' and id != ${idValue}`)
    .then(result => {
        if (result.rowCount > 0) {
            passes(false, msg)
            return
        }
        passes()
    })
})

Validator.registerAsync('unique', function(value,  attribute, req, passes) {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column')
    //split table and column
    let attArr = attribute.split(",")
    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`)

    //assign array index 0 and 1 to table and column respectively
    const { 0: table, 1: column } = attArr

    //define custom error message
    let msg = (column == "username") ? `${column} has already been taken `: `${column} already in use`
    
    //check if incoming value already exists in the database
    // i have injected data direct in query ,because this query will used by code for validation
    // which means in case its have a sql injection will not be public use
    pgPool.query(`SELECT * FROM ${table} WHERE ${column} = '${value}'`)
    .then(result => {
        if (result.rowCount > 0) {
            passes(false, msg)
            return
        }
        passes()
    })
})

export default async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages)
    validation.passes(() => callback(null, true))
    validation.fails(() => callback(validation.errors, false))
}
