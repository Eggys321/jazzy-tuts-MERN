const userModel = require('../model/userModel')
//middleware for admin
const isAdmin = async(req, res, next) => {
    const {role} = req.user
    const USER = await userModel.find(role)
    if (USER === 'user') {
        return res.status(401).json({success:false,message:"Access denied, you must an admin"})
    }
    next();
}

module.exports = isAdmin
