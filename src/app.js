const express=require('express');
const multer=require('multer');
const cors=require('cors');
const path=require('path');
const bodyParser=require('body-parser');
// const { urlencoded } = require('express');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port=process.env.PORT||3000;
const staticPath=path.join(__dirname,'../public');
// app.use(express.json());
// app.use(express.urlencoded({extended:false}));
app.use(express.static(staticPath));
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, "temp.jpg");
    }
})
let upload = multer({ storage: storage });
app.get('/',(req,res)=>{
    res.send('index');
})
app.post('/post', upload.single('upfile'),(req, res)=>{
    console.log(req.file);
        // res.status(200).send("This is uploaded ");
    // console.log(req.file);
    const object={
        "name":req.file.originalname,
        "type":req.file.mimetype,
        "size":req.file.size
    }
    // console.log(object);
    res.json(object);
 });
app.listen(port,()=>{
    console.log("Here is Port ",port);
})
