const { User, Course,Course_Content,Course_Comment } = require ('../models')

class CourseController {
    static async showCourses(req, res) {
      try {
        let course = await Course.findAll({
        order: [["id", "ASC"]],
          include: 
               [Course_Content] 
        });
  
        res.status(200).json(course);
      } catch (err) {
        res.status(500).json(err);
      }
    }

    static async showCoursesUsers(req, res) {
      try{
        const {id} = req.UserDetail
        let course =  await Course.findAll({
          where : { UserId : id }
        })
        res.status(200).json(course)

      }catch(err){
        res.status(500).json(err)
      }
    }

    static async showCoursesById(req, res) {
      try {
        const id = +req.params.id;
        // console.log(id)
        let course = await Course.findOne({
          where: {id},
            include: 
                [User,Course_Content,Course_Comment] 
          });
        res.status(200).json(course);
      } catch (err) {
        res.status(500).json(err);
      }
    }

    static async addCourses(req, res) {
        try {
          const { name,description,category,sub_category,price,duration,total_materi,level,author,rating,student,UserId} = req.body;
          let filename = req.file.filename;  
          let course = await Course.create({
            name,description,category,sub_category,price,duration,total_materi,level,author,rating,student,UserId
          });
          let filesize = req.file.size;
          let filetype = req.file.mimetype;
          let img = await Course_Content.create(
            { filename, filesize, filetype, primary:true, CourseId:course.id }
          );
          
        //   const UserId = req.UserDetail.id
          res.status(201).json (course);
        } catch (err) {
          res.status(500).json(err);
        }
      }

    static async deleteCourses(req, res) {
    try {
          const id = +req.params.id;
          let result = await Course.destroy({
            where: { id },
          });
          res.status(200).json(result)
        } catch (err) {
          res.status(500).json(err);
        }
      }
    
    static async updateCourses(req, res) {
    try {
      const id = +req.params.id;
      const { name,description,category,sub_category,price,duration,total_materi,level,author,rating,student } = req.body;
      let course = await Course.update(
        {
          name,description,category,sub_category,price,duration,total_materi,level,author,rating,student
        },
        {
          where: { id },
        }
      );
      res.status(200).json (course);
    } catch (err) {
      res.status(500).json(err);
    }
  }

}

module.exports = CourseController;