const { Sequelize, Model, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });


const connect = () => {

    const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        dialect: "postgres",
        define: {
            timestamps: false
        },
    });
    return sequelize;
};


module.exports = connect;