const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
dotenv.config();


const URL = process.env.URL;
const AccessKey = process.env.AccessKey;

const CreatePullZone = async(req,res) =>{
    const  name = req.body.name;
    const storageId = req.body.storageId;
    const type = req.body.type ? req.body.type : 1;

    try {
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                AccessKey:AccessKey
            },
            body : JSON.stringify({StorageZoneId:storageId,Type:type,Name:name})
        };
          
          fetch(url, options)
            .then(res => res.json())
            .then((json) => {
                console.log(json);
                res.status(200).send(json);
            })
            .catch(err => res.status(500).send(err));
    } catch (error) {
        res.status(500).send(error);
    }


}

module.exports = {CreatePullZone};