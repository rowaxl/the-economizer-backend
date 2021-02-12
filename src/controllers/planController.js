const Plans = require('../models/Plan')

const records = [
  { id: 1, amount: -22, category: 'Grocery', createdAt: 123 },
  { id: 2, amount: -40.15, category: 'Entertainment', createdAt: 133 },
  { id: 3, amount: -120.10, category: 'Educaiton', createdAt: 140 },
  { id: 4, amount: 480, category: 'Income', createdAt: 200 },
  { id: 5, amount: -30, category: 'Grocery', createdAt: 223 },
  { id: 6, amount: 15, category: 'Tax Refund', createdAt: 423 },
  { id: 7, amount: -20, category: 'Educaiton', createdAt: 423 },
]

module.exports = {
  getPlans: async (req, res) => {
    const userID = req.user.email

    const plans = await Plans.find({ userID })

    console.log({ plans })

    res.status(200).send(plans)
  },
  createPlan: async (req, res) => {
    const newPlan = req.body

    const startFrom = Math.floor(Math.random() * (records.length -1))
    const endAt = Math.floor(Math.random() *  (records.length - startFrom) + startFrom)

    newPlan.records = records.slice(startFrom, endAt)
    newPlan.userID = req.user.email

    const plan = await new Plans(newPlan).save()

    res.status(201).send(plan)
  },
  updatePlan: async (req, res) => {
    const id = req.params.id
    const updatedPlan = req.body

    const plan = await Plans.findByIdAndUpdate({ id }, { ...updatedPlan })

    res.status(200).send(plan)
  }, 
  deletePlan: async (req, res) => {
    const id = req.params.id

    await Plans.findOneAndDelete({ id })
  }
}