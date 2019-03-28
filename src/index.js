const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// console.log(req.body)
// const bcrypt = require('bcrypt')

// const myFunction = async()=>{
//     const password = "Red@121!"
//     const hashedPassword = await bcrypt.hash(password,8)
//     console.log(password)
//     console.log(hashedPassword)
//     // console.log("Hii")
//     const isMatch = await bcrypt.compare("password",hashedPassword)
//     console.log(isMatch)
// }
// myFunction()
