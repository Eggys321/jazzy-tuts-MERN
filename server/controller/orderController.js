const orderModel = require('../model/orderModel');

// create an order
const order = async (req,res)=>{
    req.body.user = req.user.userId

    const {orderItems,recipient,address} = req.body;
    if(orderItems && orderItems.length === 0){
        res.status(400).json({success:false,message:"No order items yet"})
        return
    }
    if(!orderItems || !recipient || !address){
        res.status(400).json({success:false,message:"to make an order you must fill recipient, address and order item(s)"})
        return

    }
    try {
        const order = await orderModel.create({...req.body});
        res.status(201).json({success:true,message:"order created successfully", order})
    } catch (error) {
        res.status(500).json(error.message)
        
    }

}


module.exports = {
    order
}