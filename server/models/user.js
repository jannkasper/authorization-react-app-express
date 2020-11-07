const sequelize = require('../config/sequelize.js');
const { Op } = require("sequelize");

const UserModel = sequelize.define("UserModel",{
    name: {
        type: sequelize.Sequelize.STRING,
        allowNull: true
    },
    mobile: {
        type: sequelize.Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: sequelize.Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: sequelize.Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: true
    },
    userType: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false
    },

});
UserModel.login = mobile_or_email => {
    return UserModel.findAll({
        where: {
            [Op.or]: [
                {mobile: mobile_or_email},
                {email: mobile_or_email},
            ]
        }
    }).then(login => login.length === 1 ? login[0] : undefined);
}


UserModel.sync({force: false}).then(() => {console.log("User Table Synchronized")});

module.exports = UserModel;
