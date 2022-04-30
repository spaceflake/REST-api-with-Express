const express = require('express')
const fs = require('fs')
const { nanoid } = require('nanoid')

const router = express.Router()

router
  .get('/', (req, res) => {
    const members = getMembers()
    res.json(members)
  })
  .get('/:id', (req, res) => {
    const { id } = req.params
    const members = getMembers()

    const foundMember = members.find((member) => member.id === id)
    if (!foundMember) {
      return res
        .status(404)
        .send({ error: true, msg: 'This member do not exist' })
    }

    const member = foundMember

    res.json(member)
  })
  .post('/', (req, res) => {
    const members = getMembers()

    const newMember = {
      id: nanoid(),
      ...req.body,
    }

    members.push(newMember)
    saveMembers(members)
    res.send({ success: true, msg: 'A new member was added' })
  })
  .put('/', (req, res) => {
    const memberData = req.body
    const members = getMembers()

    const foundMember = members.find((member) => member.id === req.body.id)
    if (!foundMember) {
      return res
        .status(404)
        .send({ error: true, msg: 'This member do not exist' })
    }

    const updatedMember = members.filter((member) => member.id !== req.body.id)

    updatedMember.push(memberData)

    saveMembers(updatedMember)
    res.send({ success: true, msg: 'Member updated' })
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params
    const members = getMembers()

    const memberIndex = members.findIndex((member) => member.id === id)
    if (memberIndex === -1) {
      return res.status(404).send({ error: true, msg: 'member does not exist' })
    }

    members.splice(memberIndex, 1)
    saveMembers(members)
    res.send({ success: true, msg: 'Member was removed' })
  })

// functions for getting/saving data from json file
const saveMembers = (data) => {
  const saveData = JSON.stringify(data)
  fs.writeFileSync('./server/data/members.json', saveData)
}
const getMembers = () => {
  const heroData = fs.readFileSync('./server/data/members.json')
  return JSON.parse(heroData)
}

module.exports = router
