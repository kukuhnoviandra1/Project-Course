const router = require('express').Router();
// const swaggerUi = require('swagger-ui-express')
// const apiDocumentation = require('../api-doc.json')


router.get('/',(req, res) =>{
    res.status(200).json({
        message : "ONLINE COURSE"
    })
})

// router.get(('/api-docs',swaggerUi.serve,swaggerUi.setup(apiDocumentation)))

const UsersRoutes = require('./users')
const LineItemsRoutes = require('./lineitems')
const OrdersRoutes = require('./orders')
const CourseContentsRoutes = require('./coursecontents')
const CoursesRoutes = require('./courses')
const CoursesCartsRoutes = require('./coursecarts')

router.use('/users', UsersRoutes)
router.use('/line_items', LineItemsRoutes)
router.use('/orders', OrdersRoutes)
router.use('/course_contents', CourseContentsRoutes)
router.use('/courses', CoursesRoutes)
router.use('/course_carts', CoursesCartsRoutes)

module.exports = router;