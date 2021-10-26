var express = require('express')
var router = express.Router()
const homeCafeController = require('../controllers/homeCafeController')


router.get('/', homeCafeController.homeCafe)
router.get('/login', homeCafeController.login)
router.get('/admin/:id/edit', homeCafeController.edit)
router.patch('/admin/:id/restore', homeCafeController.restore)
router.delete('/admin/:id/destroy', homeCafeController.destroy)
router.delete('/admin/:id/destroyPower', homeCafeController.destroyPower)
router.post('/admin/create', homeCafeController.create)
router.post('/admin/handle-form', homeCafeController.handleForm)

router.put('/admin/:id', homeCafeController.update)
router.get('/trashMenu', homeCafeController.trashMenu)
router.get('/add', homeCafeController.add)





router.get('/admin', homeCafeController.admin)







module.exports = router;