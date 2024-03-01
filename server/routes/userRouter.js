const Router = require('express')
const router = new Router()
const userController = require('../Controllers/userController.js')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/auth', userController.check)
router.get('/activate/:link', )
router.get('/refresh', )

module.exports = router