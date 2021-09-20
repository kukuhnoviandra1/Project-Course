const { Course_Cart, User,Course,Course_Content,Line_Item } = require("../models");

class CourseCartController {
  static async showCarts(req, res) {
    try {
      let cart = await Course_Cart.findAll({
        order: [["id", "ASC"]],
      });

      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async showCartsUsers(req, res) {
    try {
      const { id } = req.UserDetail;
      let cart = await Course_Cart.findAll({
        where: { UserId: id,status:"Open" },
        include: [
          {
            model: Line_Item,
            include: [
              {
                model: Course,
                include: [
                  {
                    model: Course_Content,
                  },
                ],
              },
            ],
            where:{status:"Cart"}
          },
        ],
      });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async showCartsById(req, res) {
    try {
      const id = +req.params.id;
      let cart = await Course_Cart.findOne({
        where: { id },
        include: [User],
      });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async addCarts(req, res) {
    try {
      const UserId = req.UserDetail.id
      let cart = await Course_Cart.create({
        created_on: new Date(),
        status: 'Open',
        UserId,
      });
      res.status(201).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteCarts(req, res) {
    try {
      const id = +req.params.id;
      let result = await Course_Cart.destroy({
        where: { id },
      });
      await Line_Item.destroy({
        where:{CourseCartId: id}
      })
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async updateCarts(req, res) {
    try {
      const id = +req.params.id;
      const { status, UserId } = req.body;
      let cart = await Course_Cart.update(
        {
          created_on: new Date(),
          status,
          UserId,
        },
        {
          where: { id },
        }
      );
      res.status(200).json({
        message: "Data Has Been Update",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = CourseCartController;
