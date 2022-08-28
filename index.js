const express = require('express')
const {request, response} = require("express");
const multer = require('multer');
const fetch = require('node-fetch')
const FormData = require("form-data")
const fs = require('fs');
// const ejs = require('ejs');


const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use('/uploads', express.static('uploads'));
// app.use(express.static('views'))
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render('index', {
        students: [],
        signatures: [],
        binary_img: '',
        binary_inv_img: '',
        deskew_img: '',
        grayscale_img: '',
        hl_img: '',
        vl_img: '',
        vh_img: '',
        vh_binary: '',
        img_cnt: '',
        original_img: '',
        table_cells: []
    })
})