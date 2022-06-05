import express from 'express'
import Store from './routes/store'
import path from 'node:path'
import bodyParser from 'body-parser'
import 'ejs'

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/views'))
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false })); // configure the app to parse requests with urlencoded payloads
app.use(express.json()); // configure the app to parse requests with JSON payloads
app.use(bodyParser.text());

app.get('/', (req, res) => {
    res.send('a')
})

app.use('/store', Store)

export default app