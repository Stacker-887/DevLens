const express = require('express')
const Project = require('../models/Project')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()

    res.json(projects)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch projects'
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      language: req.body.language,
      status: req.body.status
    })

    const savedProject = await project.save()

    res.status(201).json(savedProject)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create project'
    })
  }
})

module.exports = router