
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res)=>{
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts',verifyToken, (req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);            
        }else{
            res.json({
                message:'Post created',
                authData
            });            
        }
    })
    
});

app.post('/api/login',(req,res)=>{
    const user={
        id:1,
        username:'ravikuwi',
        email:'ravi@test.com'
    };
    jwt.sign({user:user},'secretkey',{expiresIn:'20s'},(err,token)=>{
        res.json({
           token
        });
    });
})

//format of token
//Authorization: Bearer <access_token>

function verifyToken(req,res,next){
     const bearerHeader = req.headers['authorization'];
     if(typeof bearerHeader !== 'undefined'){
        const bearder = bearerHeader.split(' ');
        const bearerToken = bearder[1];
        req.token=bearerToken;
        next();
     }else{
         res.sendStatus(403);
     }

}

app.listen(5000, ()=>console.log('server started on port 5000'));
