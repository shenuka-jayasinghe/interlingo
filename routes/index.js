const express = require ('express')
const router = express.Router()
const needle = require('needle')


router.get('/', async (req, resp) => {
    const apiRes = await needle('get', )
    //resp.json({ success: true })
})

module.exports = router