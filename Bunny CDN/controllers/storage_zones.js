const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const StorageZone = require('../models/storage');
const mongoose = require('mongoose');
dotenv.config();


const URL = process.env.URL;
const AccessKey = process.env.AccessKey;

const getAllStorageZones = async(req,res) =>{

    const result = []
    try {
        const inputOptions = {
            method :"GET",
            headers: {
                Accept: 'application/json',
                AccessKey: AccessKey
            }
        };

        await fetch(URL,inputOptions)
        .then(res =>res.json())
        .then((json) => {
            json.map((StorageZone) =>{

                result.push({
                    Name : StorageZone.Name,
                    Id : StorageZone.Id,
                    Modified : StorageZone.DateModified
                })
            });
            res.status(200).send(result);
        })
        .catch(err => res.status(500).json(
            {error :"Some error occuredd while fetching API",
            message :err
        }))
    } catch (error) {
        res.status(500).json({ message: "Some internal error ocurred while parsing data" });
    }
};

const createStorageZone = async(req,res) =>{
    
    let zone = 'DE';  //The default zone
    let name;
    const created_by = req.body.created_by;
    if(req.body.zone){
        zone = req.body.zone;
    }
    if(req.body.name){
        name = req.body.name;
    }else{
        res.status(404).send({error:"Enter the name of Storage zone to create"});
    }
    try {
        const options ={
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                AccessKey: process.env.AccessKey
            },
            body :JSON.stringify({Name:name,Region:zone})
        };
        console.log(options);
        fetch(URL,options)
        .then(res => {
            if(res.status !=201){
                throw new Error("The Storage Zone name is already taken");
            }
            res.json()
        })
        .then((json) =>{
            const newStorageZone = {
                created_by:created_by,
                storage_name :name,
            };
            const sz = new StorageZone(newStorageZone);
            sz.save();
            res.status(200).send({
                message :"Storage zone added succefully"
            });
        })
        .catch(err => res.status(500).json(
            {error :"Some error occuredd while fetching API",
            message :err.message
        }))
    } catch (error) {
        res.status(409).json({message:error.message});
    }
};
module.exports ={
    getAllStorageZones,
    createStorageZone
};