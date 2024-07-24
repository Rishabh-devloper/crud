const express = require('express')
const Router = express.Router()
const menuItem = require('./../models/menuItem')


Router.post('/', async (req , res)=>{
    try {
        const data = req.body
        const newmenuItem = new menuItem(data)
        const response = await newmenuItem.save()
        console.log('data saved')
        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'internal error'})
        
    }


})
Router.get('/' , async (req , res)=>{
    try {
        const data = await menuItem.find()
        res.status(200).json(data)
    }
    catch(error){
        console.log(error)
        res.status(500).json({error: 'internal error'})
    }
})

Router.put('/:id' , async (req ,res)=>{
    try {
        const id = req.params.id;
        const data = req.body ;
        const response = await menuItem.findByIdAndUpdate(id , data , {new : true})
        res.status(200).json(response)

    } catch (error) {
        res.status(500).json({message : error})
        
    }
})

Router.delete('/:id' , async (req , res)=>{
    try {
        const id = req.params.id;
        const response = await menuItem.findByIdAndDelete(id)
        res.status(200).json(response)
        } catch (error) {
            res.status(500).json({message : error})
        }
    })

module.exports= Router