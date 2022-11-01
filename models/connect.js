const { Sequelize, Model, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

    
    

    const connect = async () => {
        const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            dialect: "postgres",
        });
      await sequelize.authenticate()
            .then(() => {
                console.log("Connection has been established successfully.");
            })
            .catch((err) => {
                console.log("Unable to connect to the database:", err.message);
            });
    };

    const db = connect;

module.exports = db;
