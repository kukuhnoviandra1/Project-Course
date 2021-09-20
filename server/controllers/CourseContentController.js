const { Course_Content,Course} = require("../models")

class CourseContentController {
  static async showImages(req, res) {
    try {
      let img = await Course_Content.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(img);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async uploadContent(req, res) {
    try {
      // const { title,description,duration } = req.body;
      const CourseId = +req.params.CourId;
      let filename = req.file.filename;
      let filesize = req.file.size;
      let filetype = req.file.mimetype;
      let img = await Course_Content.create(
        { filename, filesize, filetype, primary:true, CourseId }
      );
      res.status(200).json(img);
    } catch (err) {
      res.status(403).json(err);
    }
  }
  static async updateImages(req, res) {
    try {
      // const { title,description,duration } = req.body;
      const CourseId = +req.params.CourId
      let filename = req.file.filename;
      let filesize = req.file.size;
      let filetype = req.file.mimetype;
      let img = await Course_Content.update(
        { title,description,duration,filename, filesize, filetype},
        {
          where: { CourseId },
        }
      );
      res.status(200).json({
        message: "Status Has Been Update",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteImages(req, res) {
    try {
      const id = +req.params.id;
      let result = await Course_Content.destroy({
        where: { id },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = CourseContentController;
