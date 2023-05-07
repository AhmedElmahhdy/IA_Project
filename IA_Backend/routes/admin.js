const express = require('express')
const router = express.Router()
const conn = require("../db/dbConnection");
const admin = require("../middleware/admin")
const util = require("util")

const { body, validationResult } = require("express-validator");

// view table user_account
router.get("/view_new_user",admin,async(req,res) =>
{
    const query = util.promisify(conn.query).bind(conn);
    const books= await query("select * from user_account");
     // SELECT user.Name,user.Email, user_account.user_id from user_account INNER JOIN user on user_account.user_id = user.Id;
       
     res.status(200).json(books)
    
}
);
// approve user 
router.post("/:id",admin,async(req,res) =>
{
    const query= util.promisify(conn.query).bind(conn);
    const books= await query("select * from user_account where user_id =?",[req.params.id]);
   // console.log(books[0]);
   // change status in user_account table from 0 to 1 
      await query("UPDATE `user_account` set `Status`= 1  WHERE user_id = ?",[req.params.id]);
    // change status in user table 
      await query("UPDATE user , user_account set user.Status = user_account.Status WHERE  user_account.user_id =? and  user_account.user_id  = user.id   ",books[0].user_id)
    // delete from user_account table 
    await query ("DELETE FROM user_account WHERE user_id= ? ", [req.params.id])
     
    
     res.status(200).json(books)
    
}
);
// rejected user
router.post("/:id",admin,async(req,res) =>
{
    const query= util.promisify(conn.query).bind(conn);
    const books= await query("select * from user_account where user_id =?",[req.params.id]);
   // console.log(books[0]);
   
    await query ("DELETE FROM user_account WHERE user_id= ? ", [req.params.id])
     
    
     res.status(200).json(books)
    
}
);


module.exports= router;
