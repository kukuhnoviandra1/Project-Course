const CourseContentRouter = require('express').Router();
const CourseContentController = require('../controllers/CourseContentController');
// const {authentication,authorization} = require('../middlewares/auth')
const upload = require('../middlewares/multer')


CourseContentRouter.get("/",CourseContentController.showImages)
CourseContentRouter.post("/upload/:CourId",upload.single("content"),CourseContentController.uploadContent)
CourseContentRouter.put("/update/:CourId",upload.single("content"),CourseContentController.updateImages)
CourseContentRouter.delete("/delete/:id",CourseContentController.deleteImages)

module.exports = CourseContentRouter;