// this is to cheack Status of user 0 or 1 
const conn = require("../db/dbConnection");
const util = require("util");

const user= async(req , res, next ) => {
     const query = util.promisify(conn.query).bind(conn);
     const { token }= req.headers;
     const user = await query ("select * from user where token = ? ", [token]);
     console.log(user[0].Status);
    if (user[0].Status == 1){
        next();  
    }else{
       // console.log(user[0]);
        res.status(403).json({
            msg:"you account is not active to access this route !",
            
        });
    }
}

module.exports= user;