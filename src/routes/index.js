const { Router } = require('express')
const auth = require('../middleware/auth')
const planController = require('../controllers/planController')

const router = Router()

router.get('/plans', auth, planController.getPlans)
router.post('/plans', auth, planController.createPlan)
router.put('/plans/:id', auth, planController.updatePlan)
router.delete('/plans/:id', auth, planController.deletePlan)

module.exports = router