module.exports = app => {
    
    app.get('/api/v1/index', 'home.index');
    app.get('/api/v1/users', 'home.getUsers');
    app.get('/api/v1/users/:userId', 'home.getUser');
    app.post('/api/v1/users/user', 'home.addUser');
    app.delete('/api/v1/users/:userId', 'home.deleteUser');
}


// app.post('/api/v1/users/user', 'home.addUser');
// {
//     id,
//     name,
//     age,
//     sex
// }