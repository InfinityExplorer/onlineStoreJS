const Router = require('express')
const router = new Router()
const typeController = require('../Controllers/typeController.js')

router.post('/', typeController.create)
router.get('/', typeController.getAll)

module.exports = router