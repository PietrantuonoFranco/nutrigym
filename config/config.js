require('dotenv').config();

module.exports = {
    development: {
        url: process.env.POSTGRES_URL_NON_POOLING,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    },
    test: {
        url: process.env.POSTGRES_URL_NON_POOLING,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    },
    production: {
        url: process.env.POSTGRES_URL_NON_POOLING,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    },
};