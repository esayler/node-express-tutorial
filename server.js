import express from 'express'
import morgan from 'morgan'
import chalk from 'chalk'
const app = express()

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello World')
})

const server = app.listen(8081, _ => {
  const port = server.address().port
  console.log(chalk.green(`Example app listening at http://localhost:${port}`))
})
