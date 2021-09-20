const { Line_Item, Course_Cart, Course,Order } = require("../models");

class LineItemController {
  static async showLineItems(req, res) {
    try {
      let lineitem = await Line_Item.findAll({});
      res.status(200).json(lineitem);
    } catch (err) {
      res.status(404).json(err);
    }
  }

  static async showItemsUsers(req, res) {
    try {
      const { id } = req.UserDetail;
      let items = await Line_Item.findAll({
        where: { UserId: id },
      });
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async showItemsById(req, res) {
    try {
      const id = +req.params.id;
      let product = await Line_Item.findByPk(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async addLineItem(req, res){
    try {
      const UserId = +req.UserDetail.id;
      const courseId = +req.params.CourId;
      const created_on=new Date()
      const qty = 1;
      
      const course = await Course.findByPk(courseId)
      const carts = await Course_Cart.findAll({
        where: { UserId,status:'Open' },
        include: [
          {
            model: Line_Item,
            include: [
              {
                model: Course,
              },
            ],
            order: [[Course, "id", "ASC"]],
          },
        ],
        order: [["id", "ASC"]],
      });

      // console.log(carts.length);
      if (carts.length > 0) {
        let tFound = false
        console.log('1')
        carts.forEach(async (cart)=>{
          console.log('2')
          cart.Line_Items.forEach(async(line_item)=>{
            console.log('3')
// console.log(line_item.CourseId)
// console.log(courseId)
// console.log(line_item.status)
            if(line_item.CourseId === courseId && line_item.status ==='Cart'){
              tFound=true
               console.log('4')
              await Line_Item.update({
                qty:line_item.qty + qty
              },{where:{id:line_item.id}})
              return true
            }
            
          })
        })
        if(tFound===false){
          console.log('5')
          const tc = await Course_Cart.create({
            UserId,
          });
          await Line_Item.create({
            created_on,
            CourseCartId: tc.id,
            CourseId: courseId,
            qty,
          });
        }
        
      } else {
        console.log("create2");
        const tc = await Course_Cart.create({
          UserId,
        });
        await Line_Item.create({
          CourseCartId: tc.id,
          CourseId: courseId,
          qty,
        });
      }

      // const cart = await Tours_cart.findAll({
      //   where: { UserId },
      //   include: [
      //     {
      //       model: Line_item,
      //       include: [
      //         {
      //           model: Tour,
      //         },
      //       ],
      //       order: [[Tour, "id", "ASC"]],
      //     },
      //   ],
      //   order: [["id", "ASC"]],
      // });
      res.status(200).json({
        message: "Added to cart!",
        // cart,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteLineItem(req, res) {
    try {
      const id = +req.params.id;
      let result = await Line_Item.destroy({
        where: { id },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updateLineItem(req, res) {
    try {
      const id = +req.params.id;
      const { qty, status, CourseId, Course_CartId, OrderId } = req.body;
      let lineitem = await Line_Item.update(
        {
          qty,
          status,
          CourseId,
          Course_CartId,
          OrderId,
        },
        {
          where: { id },
        }
      );
      res.status(200).json(lineitem);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = LineItemController;
