const users = [{
    login: 'nick',
    pass: '123',
    email: 'kozachenko.mykola21@gmail.com',
    role: 'admin'
}]

exports.getUser = function(login) {
    return newInstance().find((user) => user.login === login)
}

exports.addUser = function(login, pass, email) {
    users.push( { login, pass, email, role: 'user' } )
}

function newInstance() { //need a database
    return JSON.parse(JSON.stringify(users))
}