const express=require('express')
const mongoose=require('mongoose')
const app = express();
const postModal = require('./modals/postSchema')
var moment = require('moment');
const multer =require("multer");
const fs = require("fs");
require('dotenv').config(); 
app.use(express.static(__dirname+"/uploads/"))
app.use(express.json({limit: "30mb", extended: true}))
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

//listen port
app.listen(process.env.PORT || 3001, (err)=> {
    if(!err) {
        console.log("Server started at port 3001")
    } else {
        console.log(err);
    }
})

// mongoose.connect("mongodb://localhost/instaclone", (data)=> {
//     console.log("Successfully connected to db");
// }, (err)=> {
//     console.log(err)
// });

//mongo db connection
const url = process.env.MONGO_URI
mongoose.connect(url,{ 
    useNewUrlParser: true, 
 
    useUnifiedTopology: true, 
    
}).then(()=>{
    console.log("Successfully connected to db");
}).catch((err)=>{
    console.log("no connection",err)
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//base route
app.get("/", (req, res)=> {
    res.send("insta clone Backend")
});




//get post route
app.get("/posts",  (req, res) => {

     postModal.find().sort({_id:-1}).then((post) => {
        res.status(200).send(post)
    })
})

//multer
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,`${__dirname}/uploads/`)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        console.log("file uploaded")
      },
   
  
})

const upload=multer({storage:storage})

//add post route
app.post("/addpost",upload.single("PostImage"), async (req, res) => {
    //  if(req.file.contentType){
    //     res.send("please upload the file")
    //     console.log("pls upload")
    //  }
        postModal.create({
            name: req.body.name, location: req.body.location,
            description: req.body.description,PostImage:{
                data:fs.readFileSync(`${__dirname}/uploads/${req.file.filename}`),
                contentType: "image/png",
            },
            likes:0,date:new Date()
        })
            .then((data) => {
                // res.status(200).send(data)
                
                res.redirect("/posts")
            }).catch((err) => {
                res.status(400).send(err.message)
            })
     }
)


//likes update route
app.put('/like', (req, res) => {
    postModal.findById(req.body.postId,function(err,thePost){
        if(err){
            res.status(500).send("some thing went wromg")
        }else{
          thePost.likes+=1;
           thePost.save(function(err){
            if(err){
                res.status(500).send("some thing went wrong here")
            }else{
                 res.send({likes:thePost.likes})
            }
           })
        }
    })
   
})