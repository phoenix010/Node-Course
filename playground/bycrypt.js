const bcrypt = require('bcrypt')

const myFunction = async()=>{
    const password = "Red@121!"
    const hashedPassword = await bcrypt.hash(password,8)
    console.log(password)
    console.log(hashedPassword)
    // console.log("Hii")
    const isMatch = await bcrypt.compare("password",hashedPassword)
    console.log(isMatch)
}
myFunction()