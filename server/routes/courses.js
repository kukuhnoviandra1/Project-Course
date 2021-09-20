const CourseRouter = require('express').Router();
const CourseController = require('../controllers/CourseController');
const {authentication} = require('../middlewares/auth')
const upload = require('../middlewares/multer')


CourseRouter.get('/',CourseController.showCourses)
CourseRouter.get('/auth',CourseController.showCoursesUsers)
CourseRouter.get('/:id',CourseController.showCoursesById)
CourseRouter.post('/add',upload.single("content"),CourseController.addCourses)
CourseRouter.delete('/delete/:id',authentication,CourseController.deleteCourses)
CourseRouter.put('/update/:id',authentication,CourseController.updateCourses)

module.exports = CourseRouter;