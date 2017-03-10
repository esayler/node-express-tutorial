import express from 'express'
import path from 'path'
import morgan from 'morgan'
import chalk from 'chalk'
import fs from 'fs'
import multer from 'multer'
import bodyParser from 'body-parser'

const app = express()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(morgan('dev'))
app.use(express.static('public'))

const upload = multer({ dest: 'uploads/' })

app.get('/', (req, res) => {
  console.log(chalk.yellow('Got a GET request for the homepage'))
  res.send('Hello GET')
})

app.get('/index.html', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.post('/process_post', urlencodedParser, (req, res) => {
  // Prepare output in JSON format
  const response = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  }

  console.log(chalk.green(JSON.stringify(response)))
  res.end(JSON.stringify(response))
})

app.post('/file_upload', upload.single('file'), (req, res) => {
  console.log(req.file)
  const file = path.resolve(__dirname, req.file.originalname)

  fs.readFile(req.file.path, (err, data) => {
    fs.writeFile(file, data, err => {
      let response
      if (err) {
        response = err
        console.log(err)
      } else {
        response = {
          message: 'File uploaded successfully',
          filename: req.file.name,
        }
      }
      console.log(JSON.stringify(response))
      res.end(JSON.stringify(response))
    })
  })
})

app.post('/', (req, res) => {
  console.log(chalk.yellow('Got a POST request for the homepage'))
  res.send('Hello POST')
})

app.delete('/del_user', (req, res) => {
  console.log(chalk.yellow('Got a DELETE request for /del_user'))
  res.send('Hello DELETE')
})

app.get('/list_user', (req, res) => {
  console.log(chalk.yellow('Got a GET request for /list_user'))
  res.send('Page Listing')
})

const server = app.listen(8081, _ => {
  const port = server.address().port
  console.log(chalk.green(`Example app listening at http://localhost:${port}`))
})
