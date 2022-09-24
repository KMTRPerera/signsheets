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


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, 'img.jpeg')
    }
})
let upload = multer({storage: storage})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.post('/readimg', upload.single('file'), async (req, res) => {

    let fd = new FormData()
    fd.append('file', fs.createReadStream('./uploads/img.jpeg'))
    let response = await fetch('http://127.0.0.1:5000/checkattendance', {
        method: 'post',
        body: fd,
        headers: {
            ...fd.getHeaders()
        },
    })
    let data = await response.json()
    console.log(data)
    res.render('index', {
        students: data.students,
        signatures: data.signatures,
        binary_img: data.binary_img,
        binary_inv_img: data.binary_inv_img,
        deskew_img: data.deskew_img,
        grayscale_img: data.grayscale_img,
        hl_img: data.hl_img,
        vl_img: data.vl_img,
        vh_img: data.vh_img,
        vh_binary: data.vh_binary,
        img_cnt: data.img_cnt,
        original_img: data.original_img,
        table_cells: data.table_cells
    })
});
