import express from 'express'
import path from 'path'
import morgan from 'morgan'
import chalk from 'chalk'
const app = express()

app.use(morgan('dev'))
app.use(express.static('public'))

app.get('/', (req, res) => {
  console.log(chalk.yellow('Got a GET request for the homepage'))
  res.send('Hello GET')
})

app.get('/index.html', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/process_get', (req, res) => {
  // Prepare output in JSON format
  const response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
  }

  console.log(chalk.green(JSON.stringify(response)))
  res.end(JSON.stringify(response))
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
