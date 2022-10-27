const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User, validate } = require('./../Models/users');
const connection = require('./../StartUp/MongoDb');

const userService = {};


async function hashPassword(plainPass) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPass, salt);
}

async function signIn(req, res) {
    await connection();
    const { password, email } = req.body;

    

    const claimedUser = await User.findOne({ email: email });

    console.log(claimedUser.password);


    if (claimedUser == null) {
        console.log("1")
        return res.status(400).send({ data: "Username or Password is invalid" });
    }
    
    const isVerify = await bcrypt.compare(password, claimedUser.password);
    if (isVerify) {
        const token = claimedUser.generateAuthToken();
        res.status(200).send(token);
        Mongoose.connection.close().then(() => {
            connection();
        });
        
    }

}

async function getAllUsers(){
    const users = User.find({});

    return users;
}


async function deleteById(_id){
    return await User.findByIdAndDelete(_id);
}

async function registerUser(req, res) {
        const errors  = validate(req.body);
        console.log(errors.details);
        if (errors.details) {
            return res.status(400).send({ error: errors });
        };

        let user = req.body;
        user["password"] = await hashPassword(req.body.password);

        await connection();
        await User.createIndexes({ checkKeys: true });
        const newUser = await User.create(user).catch(error => { throw error });

        const token = newUser.generateAuthToken();
        return res.status(201).send(token)

};


userService.registerUser = registerUser;
userService.signIn = signIn;
userService.getAll = getAllUsers;
userService.deleteById = deleteById;

module.exports = userService;
