const config = {
    user: '*****',
    password: '*****',
    server: '*****.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'sales',
    // connectionTimeout: 1000,
    // requestTimeout: 1000,

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }    
};

module.exports = {config:config};