const express = require('express')
const router = express.Router()
const conn = require("../db/dbConnection");
const user = require ("../middleware/user")
const { body, validationResult } = require("express-validator");
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
//Login
router.post (
    "/login",
    body("email").isEmail().withMessage("please enter a valid email "),
    body("password").isLength({ min :8, max:20}).withMessage("password should be (8-20) character"),
    async (req , res) => {
        try {
           const errors = validationResult(req) ;
           if(!errors.isEmpty()){
              res.status(400).json({errors:errors.array()});
           }

           const query = util.promisify(conn.query).bind(conn);
           const user = await query(
            "select * from user where email=?",
            [req.body.email]
           );
           if (user.length == 0){
            res.status(404).json({
                errors: [
                    {
                        msgs : "email or password not found"
                    } 
                ] 
            });
           } 


           const checkPassword = await bcrypt.compare(req.body.password,
             user[0].Password);
           if (checkPassword){
             res.status(200).json(user); 
           
           }
           else{
             res.status(404).json({ 
                errors: [
                    {
                        msgs : "email or password not found"
                    }
                ]
            });
          }


            res.json("success log in ");
        }
 

        catch(err) {
            console.log(err);
        
            res.status(500).json({ err:err});
        }
    } 

)

//Registeration
router.post (
    "/register",
    body("email").isEmail().withMessage("please enter a valid email "),
    body("password").isLength({ min :8, max:20}).withMessage("password should be (8-20) character"),
    async (req , res) => {
        try {
           const errors = validationResult(req) ;
           if(!errors.isEmpty()){
              res.status(400).json({errors:errors.array()});
           }

           const query = util.promisify(conn.query).bind(conn);
           const checkEmail = await query(
            "select * from user where email=?",
            [req.body.email]
           );
           if (checkEmail.length > 0){
            res.status(400).json({
                errors: [
                    {
                        msgs : "email is already  exist"
                    }
                ]
            })
           }


           const UserData = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone, 
            email: req.body.email,
            password: await bcrypt.hash(req.body.password,10),
            token:crypto.randomBytes(16).toString("hex")
           };

 

           await query("insert into user set ?",UserData);

           const id = await query("SELECT * FROM user WHERE Email =? ", [req.body.email]);
           await query("INSERT INTO `user_account` (`id`, `user_id`, `Status`) VALUES (NULL, '?', '0')",[id[0].Id]);//"INSERT INTO `user_account` (`id`, `user_id`, `Status`) VALUES (NULL, '50', '0');"
           console.log(id[0].Id);
           
          // delete UserData.password;
           res.status(200).json(UserData);

           res.json("success");
        }
 

        catch(err) {
            console.log(err);
            res.status(500).json({ err:err});
        }
    } 

)




module.exports= router;
