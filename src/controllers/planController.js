const Plans = require('../models/Plan')

module.exports = {
  getPlans: async (req, res) => {
    const plans = await Plans.find({ userID: req.user._id })

    res.status(200).send(plans)
  },
  createPlan: async (req, res) => {
    const newPlan = req.body

    newPlan.userID = req.user._id

    const plan = await new Plans(newPlan).save()

    res.status(201).send(plan)
  },
  updatePlan: async (req, res) => {
    const id = req.params.id
    const updatedPlan = req.body

    const plan = await Plans.findByIdAndUpdate(id, { ...updatedPlan })

    res.status(200).send(plan)
  }, 
  deletePlan: async (req, res) => {
    const id = req.params.id

    await Plans.findOneAndDelete({ _id: id })

    res.status(200).send()
  }
}