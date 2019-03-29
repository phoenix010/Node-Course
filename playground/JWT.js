const jwt = require('jsonwebtoken')

const myFunction = async()=>{
    const token = jwt.sign({_id: 'abc123'}, 'this ismyne  wcourse')
    console.log(token)

    // const data = jwt.verify(token, '')
    // console.log(data)
}

myFunction()