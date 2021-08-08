const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
dotenv.config();

const URL = process.env.URL;
const AccessKey = process.env.AccessKey;

const uploadFileToBunnyCdn = async(req,res) =>{
    const url = req.body.url;
    url = url.trim();
	let stream = await gHelper.getStream(url);
	if(!stream){
		console.log('Stream null');
        res.send(404).send("The Stream in empty");
	}
    const subPathUrl = req.body.subPathUrl ? req.body.subPathUrl + '/' : '';
    const fileName = req.body.fileName;
    let fileLink = `https://storage.bunnycdn.com/${process.env.StorageZone}/${subPathUrl}${fileName}`;
    
    const inputOptions = {
        method :"PUT",
        headers: {
            Accept: 'application/json',
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            AccessKey: AccessKey
        },
        body : stream
    };

    fetch(URL,inputOptions)
    .then(res => res.json())
    .then((json) => {
        console.log(json);
        res.status(200).send(`File added succesfully - ${process.env.pullZone}/${subPathUrl}${fileName}`)
    })
    .catch(err => res.status(500).json(
        {error:"Error in uploading file",message :err}
    ))
}

module.exports = {uploadFileToBunnyCdn};