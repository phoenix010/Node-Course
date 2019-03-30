const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const main = async() => {
    const task = await Task.findById('5c9ed5a2edf9997134762b8b')
    // const data2 = await task.populate('owner').execPopulate()
    // const data = await task.populate('owner')
    // console.log(task.owner.token)
    const user = await User.findById('5c9ed582edf9997134762b89')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
    



    // console.log("*********************************************************")
    // console.log(task.owner)
    // console.log("*********************************************************")
    // console.log('TASK:: ',data)
    // console.log("*********************************************************")
    // console.log(data2)
    // console.log("*********************************************************")
    //  if(data == data2){
    //     console.log("Same")
    // }
    // else{
    //     console.log("Different")
    // }
    // console.log(typeof data2)
}

main()