const express = require('express')
const Router = express.Router()
const person = require('./../models/Person')

Router.post("/" , async (req , res)=>{
    try{
     const data = req.body
     const Person = new person(data)
     const response  = await Person.save()
     console.log('data saved')
     res.status(200).json(response)
    
    }
    catch(err){
 console.log(err)
     res.status(500).json({error: 'internal error'}) 
    }
 })
 
 Router.get("/" , async (req , res)=>{
     try {
         const data = await person.find()
         res.status(200).json(data)
     } catch (error) {
         console.log(error)
     res.status(500).json({error: 'internal error'})
     }
 })

 Router.put('/:id' , async (req , res)=>{
    try {
        const id = req.params.id;
        const data = req.body
        const response = await person.findByIdAndUpdate(id , data , {new: true})
        if (!response) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json(response)

    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


 Router.delete("/:id" , async (req , res) =>{
    try {
        const id = req.params.id;
        const response = await person.findByIdAndDelete(id)
        if (!response) {
            return res.status(404).json({ message: 'Menu item not found' });
            }
            res.status(200).json({message: 'Menu item deleted'})
            
        
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
})

 module.exports= Router