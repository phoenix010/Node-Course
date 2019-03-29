const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

/**
 * setting up express middleware
 */
// app.use((req, res, next)=>{
//     if(req.method == 'GET'){
//         console.log('GET is unabled')
//     }else{
//         next()
//     }
// })

// app.use((req, res, next)=>{
//     res.status(503).send('Under Maintainece')
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
