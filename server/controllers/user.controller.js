const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.getAll = (req, res) => {
    User.findAll({
        order: ['id']
    }). then(users => {
        res.end(JSON.stringify({users}))
    })
};

exports.register = async (req, res) => {
    let body = req.body;

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(body.password, salt);

    let newUser = {
        name: body['name'],
        mobile : body['mobile'],
        email: body['email'],
        password : hasPassword,
        status : body['status'] || 1,
        userType : body['userType'] || 2
    };
    try {
        const user = await User.create(newUser);
        const token = jwt.sign({id: user.id, user_type_id: user.userType}, config.TOKEN_SECRET);
        debugger;
        res.header("auth-token", token);

        delete user.dataValues.id;
        delete user.dataValues.password;
        delete user.dataValues.userType;

        res.send(user.dataValues);
    } catch (e) {
        res.status(500).send(e);
    }

};

exports.login = async (req, res) => {
    let body = req.body;
    try {
        // Check user exist
        debugger;
        const user = await User.login(body.mobile_or_email);
        if (user) {
            const validPass = await bcrypt.compare(body.password, user.password);
            if (!validPass) return res.status(400).send("Password is wrong");
            // Create and assign token
            const token = jwt.sign({id: user.id, user_type_id: user.userType}, config.TOKEN_SECRET);
            res.header("auth-token", token).send({"token": token});
            // res.send("Logged IN");
        } else {
            return res.status(400).send("Mobile/Email is wrong");
        }
    } catch (err) {
        if( err instanceof Error ) {
            console.log(err);
            res.status(401).send(`Mobile/Email or Password is wrong`);
        }
        else {
            let error_data = {
                entity: 'User',
                model_obj: {param: req.params, body: req.body},
                error_obj: err,
                error_msg: err.message
            };
            res.status(500).send("Error retrieving User");
        }
    }
};

// Access auth users only
exports.authuseronly = (req, res) => {
    debugger;
    res.send("Hey,You are authenticated user. So you are authorized to access here.");
};

// Admin users only
exports.adminonly = (req, res) => {
    debugger;
    res.send("Success. Hellow Admin, this route is only for you");
};
