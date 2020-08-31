const express = require('express');
const router = express.Router();
const moment = require('moment');
// cors is used for cross-site requests. Preflight request will be rejected if this is not inplace. Read up on cors please
var cors = require('cors');

// read about models usage - https://sequelize.org/v5/manual/models-usage.html
const Users = require('../models/users');

// order or routes
// read, create, update, delete / Then alphabetically

// Methods
//  not sure what methods or status responses to use? read up - https://www.restapitutorial.com/lessons/httpmethods.html

// read
router.get('/', (req, res) => {
    let { query } = req.body    
    Users.findAll({...query})
    .then(data=>{
        res.status(200).json({status: true, msg: data})
    })
    .catch(err=>{
        res.status(400).json({status: false, err: err})
    })
});

router.get('/:id', (req, res) =>{
    const { id } = req.params
    var query = { id }

    Users.findOne({
        where: query,
        attributes: ['id','email', 'name', 'lastName', 'created', 'updated']
    })
    .then(data=>{
        res.status(200).json({status: true, msg: data})
    })
    .catch(err=>{           
        res.status(400).json({status: false, err: err})
    })
});



// create
router.post('/', async (req, res) => {    
    var created = moment().unix()
    var updated = moment().unix()
    let { email, name, lastName, age } = req.body

    Users.create({
        email,
        name,
        lastName,
        age,
        created,
        updated
    })
    .then(data=>{
        res.status(200).json({status: true, msg: data})
    })
    .catch(err=>{
        res.status(400).json({status: false, err: err.errors[0].message})
    })
});



// update
// Method PUT or PATCH should be used for this
// use PUT to overwrite an entire resource
// use PATCH to modify part of a resource
router.patch('/:id', async (req, res) =>{
    const { id } = req.params
    let data = req.body
    
    // first check if any changes have been provided
    if(!Object.entries(data).length){
        res.status(200).json({status:false, err:"No content"})
    } else {
        // add the update time
        data.updated = moment().unix()
        Users.update(data, {
            where: { id }
        })
        .then(count=>{
            let countMessage = count!=1 
            ?   'records'
            :   'record'
            res.status(200).json({status: true, msg: `${count} ${countMessage} updated.`})
        })
        .catch(err=>{           
            res.status(400).json({status: false, err: err.errors[0].message})
        })
    }
});

// delete
router.delete('/:id', async (req, res) =>{ 
    const { id } = req.params  
    Users.destroy({
        where: { id }
    })
    .then(count=>{
        let countMessage = count!=1 
        ?   'records'
        :   'record'
        res.status(200).json({status: true, msg: `${count} ${countMessage} destroyed.`})
    })
    .catch(err=>{           
        res.status(400).json({status: false, err: err.errors[0].message})
    })
});

module.exports = router;