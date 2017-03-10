import express from 'express'
import morgan from 'morgan'
import chalk from 'chalk'
const app = express()

app.use(morgan('dev'))

app.get('/', (req, res) => {
  console.log(chalk.yellow('Got a GET request for the homepage'))
  res.send('Hello GET')
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

app.get('/ab*cd', (req, res) => {
  console.log(chalk.yellow('Got a GET request for /ab*cd'))
  res.send('Page Pattern Match')
})

const server = app.listen(8081, _ => {
  const port = server.address().port
  console.log(chalk.green(`Example app listening at http://localhost:${port}`))
})
