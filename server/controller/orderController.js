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

// get all orders

const getOrders = async (req,res)=>{
    try {
        const allOrders = await orderModel.find({}).populate('user').sort({ _id: -1 });
        if(allOrders.length < 1 ){
           return res.status(400).json({status:'false',message:"no orders yet at all"})
        }
        res.status(200).json({status:'true',message:'all orders',allOrders})
        
    } catch (error) {
        res.json({error})
        
    }
}

// get all orders by a user


const getAllOrdersByUser = async (req,res)=>{
    const {userId} = req.user
    
    try {
        const orders = await orderModel.find({user:userId}).populate('user');
        if(orders.length < 1 ){
            return res.status(400).json({status:'false',message:"you have not created any order"})
         }
        res.status(200).json({status:"true",message:'your order(s)',orders})
        
    } catch (error) {
        
        res.json({error})
        console.log(error.message);
    }
}

module.exports = {
    order,
    getOrders,
    getAllOrdersByUser
}