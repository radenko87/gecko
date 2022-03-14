const dbAuth = {
    username: 'gecko',
    password: '3sa!@dsad&&^k',
    dbName: 'gecko_db',
    server: '127.0.0.1:27017'
}


/*
 db.createUser(
  {
    user: "gecko",
    pwd: "3sa!@dsad&&^k",
    roles: [ { role: "readWrite", db: "gecko_db" } ]
  }
)
*/

module.exports = {
    dbAuth: dbAuth
}