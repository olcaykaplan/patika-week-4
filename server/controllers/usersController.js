const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
      let users = await User.findAll();
      console.log("users",users[0])
      res.status(200).send({error:false, userList:users[0]});
    } catch (error) {}
};