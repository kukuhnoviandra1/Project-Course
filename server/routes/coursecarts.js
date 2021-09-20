const CourseCartsRouter = require('express').Router();
const CourseCartController = require('../controllers/CourseCartController');
const {authentication} = require('../middlewares/auth')

CourseCartsRouter.get('/',CourseCartController.showCarts)
CourseCartsRouter.get('/auth',authentication,CourseCartController.showCartsUsers)
CourseCartsRouter.get('/:id',CourseCartController.showCartsById)
CourseCartsRouter.post('/add',authentication,CourseCartController.addCarts)
CourseCartsRouter.delete('/delete/:id',authentication,CourseCartController.deleteCarts)
CourseCartsRouter.put('/update/:id',authentication,CourseCartController.updateCarts)

module.exports = CourseCartsRouter;