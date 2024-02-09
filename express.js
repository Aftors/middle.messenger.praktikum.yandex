import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = 3000

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/sign-up', () => {})
app.get('/sign-in', () => {})
app.get('/', () => {})
app.get('/settings', () => {})
app.get('/messenger', () => {})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
