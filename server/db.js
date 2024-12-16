const mysql=require('mysql2');
const express=require("express");
const cors=require("cors");

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345678",
    database:"form"
});

let app=express();
app.use(express.json());
app.use(cors());

app.post("/submitdata", (req,res)=>{
    let {fname,lname,email,phoneno,dept,doj,role}=req.body;
    console.log(req.body);
    con.query(`insert into empform values(null,'${fname}','${lname}','${email}',${phoneno},'${dept}','${doj}','${role}');`,function(err,result){
        if(err){
            console.log(err);
            res.status(400).json({error:"unable to insert"});
        }else{
            res.status(200).json({message:"insert succsessfull"});
        }
    })
});

app.listen(400,()=>{
    console.log("worked");
})

