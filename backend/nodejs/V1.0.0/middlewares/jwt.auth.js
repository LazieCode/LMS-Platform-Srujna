const jwt = require('jsonwebtoken')
require('dotenv').config()

// Creating Auth Middleware
exports.auth = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    
    try {
    if(!authHeader){
        res.status(401).json({
            success: false,
            err:"Token not found"
        })
    }
    else{
        const token = authHeader.split(' ')[1];
        // console.log(token + " Jasnoor Singh")
        if(token){
        jwt.verify(token,`${process.env.JWT_SECRET}`, function(err,user){
            if(err){
                console.log(err)
                res.status(401).json({
                    success:false,
                    err:"Verification Failed"
                })
            }
            else{
                req.user = user
                next()
            }
        })
    }
    else{
        res.status(401).json({
            status:false,
            messgae:"Unauthorized"
        })
    }
    }
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success:false,
            err:error
        })
    }

}
