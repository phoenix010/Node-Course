const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

// console.log(req.body);
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        let token = await user.generateAuthToken()
        // hiding data through automation by using toJSON() defined in models.
        //Whenever you call res.send(user) then it calls the toJSON method on the user object so it will execute that code for you.
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        
        // manually hiding the password and tokens through getPublicProfil()
        res.send({user: user.getPublicProfile(), token}) 
    }catch(e){
          res.status(404).send()  
    }
} )

//logout router from specific device
router.post('/users/logout', auth, async(req,res)=>{
    try{
       req.user.tokens =  req.user.tokens.filter((token)=>{
           return token.token !== req.token
       })
       await req.user.save()
       res.send("Successfully logged out")
    }catch(e){
            res.status(500).send()
    }
})

//logging out from all sessions
router.post('/users/logoutAll', auth, async(req, res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send();
    }catch(e){
        res.status(500).send()
    }
})

//Reading my own profile
router.get('/users/me', auth,async (req, res) => {
    res.send(req.user)
})

// router.get('/users/:id', async (req, res) => {
    // const _id = req.params.id
// 
    // try {
        // const user = await User.findById(_id)
// 
        // if (!user) {
            // return res.status(404).send()
        // }
// 
        // res.send(user)
    // } catch (e) {
        // res.status(500).send()
    // }
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // console.log("Request body is "+req)
        // const user = await User.find(req.user)
        updates.forEach((update)=>req.user[update] = req.body[update])
        await req.user.save()

        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id) 

        // if (!user) {
        //     return res.status(404).send()
        // }
       await req.user.remove() // used mongoose's remove
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router