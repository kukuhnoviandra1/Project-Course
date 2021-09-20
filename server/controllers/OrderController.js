const { User , Order,Line_Item,Course,Course_Cart } = require('../models')

class OrderController {
    static async showOrders(req, res) {
        try {
          let order = await Order.findAll({
          order: [["UserId", "ASC"]],
            include: 
                 [User] 
          });
    
          res.status(200).json(order);
        } catch (err) {
          res.status(500).json(err);
        }
      }

    static async showOrdersById(req, res){  
      try{
        let id = +req.params.id;
        let orders = await Order.findOne({
            where:{id}
        })
        res.status(200).json(orders)
        }catch(err){
        res.status(500).json(err)
        }
    }
    static async showOrdersUsers(req, res) {
      try{
        const {id} = req.UserDetail
        let order =  await Order.findAll({
          where : { UserId : id }
        })
        res.status(200).json(order)

      }catch(err){
        res.status(500).json(err)
      }
    }

    static async addOrders(req, res) {
      try {
      const id = +req.params.LineId;
      const {city,address} = req.body;
      const userName = req.UserDetail.name
      const userId = req.UserDetail.id
      const rating = 1;
      const student = 1;
  
      const CourseCart = await Course_Cart.findAll({
        where: {UserId:userId,status:'Open'},
        include:[
          {
            model: Line_Item,
            where: {status:'Cart'},
            include: [
              {
                model: Course,
              },
            ],
            order:[["id","ASC"]],
          },
        ],
        order: [["id", "ASC"]],
      })
      console.log(CourseCart)
      
      let items = await Line_Item.findOne({
        where: {id,status:'Cart'}
      })
      console.log("2")
  
      if(!items){
        res.status(404).json({
          message:"Tidak Ditemukan"
        })
      }else{
        let courses = await Course.findOne({
          where:{id:items.CourseId}  
        })
        console.log("3")

        let totalQty = items.qty
        let subTotal = +items.qty * +courses.price
        console.log(subTotal)
  
        const rand = Math.round(Math.random()*56565+8010)
        let OrderName = `CC-TRX-${userName.toUpperCase()}-${rand}`
        console.log("4")
        
        await Course_Cart.update({
          status:'Closed'
        },{
          where:{id:items.CourseCartId}
        })
        console.log("5")
        
        let order = await Order.create({
          city,address,name:OrderName,created_on : new Date(),subtotal:subTotal,total_qty:totalQty,UserId:userId,
        })
        await Line_Item.update({
          status:'Checkout',
          OrderName,
          OrderId: order.id,
        },{
          where:{id}
        })
        console.log("6")
        
        await Course.update({
          rating,
          student,
        },{
          where:{id}
        })
      }
      res.status(201).json({
        message: "Checkout Success"
      })
  }catch (err) {
      res.status(500).json(err);
      }
  }
    
    static async deleteOrders(req, res) {
        try {
        const id = +req.params.id;
        let result = await Order.destroy({
        where: { id },
        });
        res.status(200).json(result)
        } catch (err) {
        res.status(500).json(err);
        }
    }
    static async updateOrders(req, res) {
        try {
          const id = +req.params.id;
          const { city,address } = req.body;
          let order = await Order.update(
            {
                city,address
            },
            {
              where: { id },
              individualHooks:true
            }
          );
          res.status(200).json ({
              message: "Data Has Been Update"
          });
        } catch (err) {
          res.status(500).json(err);
        }
      }
    static async updateStatus(req, res) {
        try {
          const id = +req.params.id;
          const { status } = req.body;
          let order = await Order.update(
            {status},
            {
              where: { id },
            }
          );
          res.status(200).json ({
              message: "Status Has Been Update"
          });
        } catch (err) {
          res.status(500).json(err);
        }
      }

}

module.exports = OrderController;