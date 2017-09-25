const { MongoClient } = require('mongodb')
const express = require('express')
const cors = require('cors')
const parser = require('body-parser')

async function main() {
    const db = await MongoClient.connect(process.env.MONGO_URL)
    const col = db.collection('test')
    const app = express()

    app.use(cors())
    app.use(parser.json())

    app.post('/insert', async (req, res) => {
        try {
            console.log('* inserting', req.body.document)
            await col.insert(req.body.document)
            res.json({})
        } catch (err) {
            res.json({ err: err.message });
        }
    })

    app.post('/update', async (req, res) => {
        try {
            console.log('* updating', req.body.selector, req.body.modifier)
            await col.update(req.body.selector, req.body.modifier)
            res.json(await col.findOne(req.body.selector))
        } catch (err) {
            res.json({ err: err.message });
        }
    })

    app.post('/remove', async (req, res) => {
        try {
            console.log('* removing', req.body.selector)
            await col.remove(req.body.selector)
            res.json({})
        } catch (err) {
            res.json({ err: err.message });
        }
    })

    app.listen(parseInt(process.env.PORT, 10), function () {
        console.log(`* app listening on port ${process.env.PORT}!`)
    })
}

main()
    .then('* mongo rest api started successfully')
    .catch(err => console.error(err && err.stack || err))