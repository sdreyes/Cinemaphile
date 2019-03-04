require("dotenv").config();
module.exports =
    {
        "development": {
            "username": "root",
            "password": process.env.SQL_PASS,
            "database": "exampledb",
            "host": "localhost",
            "dialect": "mysql"
        },
        "test": {
            "username": "root",
            "password": process.env.SQL_PASS,
            "database": "testdb",
            "host": "localhost",
            "dialect": "mysql",
            "logging": false
        },
        "production": {
            "use_env_variable": "JAWSDB_URL",
            "dialect": "mysql"
        }
    };
