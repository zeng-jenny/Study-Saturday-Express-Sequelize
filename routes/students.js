const router = require('express').Router();
const Student = require ('../db/models/student')

router.get ('/', async (req, res, next) => {
  try {
    const students = await Student.findAll()
    res.json (students)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const studentId = req.params.id
  try {
    const student = await Student.findByPk (studentId)
    if (!student) {
      res.sendStatus(404)
    }
      res.json (student)
  } catch(err) {
    next(err)
  }
})

router.post ('/', async (req, res, next) => {
  try {
    const newStudent = await Student.create({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email})
    res.status(201).send(newStudent)
  } catch (err) {
    next(err)
  }
})

router.put ('/:id', async (req, res, next) => {
  const student = await Student.findByPk(req.params.id)
  const updatedStudent = await student.update({
    firstName: req.body.firstName
  })
  res.json (updatedStudent)
})

router.delete ('/:id', async (req, res, next) => {
  const pug = await Student.findByPk(req.params.id)
  await pug.destroy ()
  res.sendStatus(204)
})

module.exports = router;
