const jwt= require('jsonwebtoken')

const generateToken= (id)=>{
    return jwt.sign({id},"SECURITY_INFORMATION_FOR_SESSION",{expiresIn:"7d"});
}

module.exports= generateToken;