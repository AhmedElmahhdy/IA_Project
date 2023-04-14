const express = require('express')
const router = express.Router()
const conn = require("../db/dbConnection");
const { route } = require('./user');
const authorize = require("../middleware/authorize");
const admin = require("../middleware/admin")
const { body, validationResult } = require("express-validator");
const upload = require('../middleware/upload-Book-Image');
const util = require("util");
const fs = require("fs");
const { hostname } = require('os');


// admin ( create , updata , delete , list ) 
// 1- create 
router.post("/create",admin,
    upload.single("image"),
    body("Title").isString().withMessage("please enter a valid book title").isLength({min:10})
    .withMessage("book title should be at least 10 characters"),

    body("Author").isString().withMessage("please enter a valid Author")
    .isLength({ min :8})
    .withMessage("Author should be (8-20) character"),

    body("Category").isString().withMessage("please enter a valid category")
    .isLength({ min :8})
    .withMessage("Category should be (8-20) character"),
 
    body("ISBN").isString().withMessage("please enter a valid ISBN")
    .isLength({ min :8 , max:10})
    .withMessage("ISBN should be (8-10) character"),

    body("RankNumber").isInt().withMessage("please enter a valid RankNumber")
    .isLength({ min :4,max : 6})
    .withMessage("RankNumber should be (4-6) character"),

    // body("BookPrice").isInt().withMessage("please enter a valid BookPrice")
    // .isLength({min : 2 , max :3})
    // .withMessage("BookPrice should be (50-500) $"),
    async (req ,res) =>
    
    {
        try{
            const errors = validationResult(req) ;
            if(!errors.isEmpty()){
               res.status(400).json({errors:errors.array()});
            }
            // validate image 
            if(!req.file)
            {
                return res.status(400).json({
                errors:[
                    {
                        msg:"image is require",
                    }
                ],
            });
            }
            // store in database
            const book = {
                Title:req.body.Title,
                Author:req.body.Author,
                Category:req.body.Category,
                ISBN:req.body.ISBN,
                RankNumber:req.body.RankNumber,
                Photo_URL:req.file.filename,
                Book_Price:req.body.Book_Price
            }
            const query = util.promisify(conn.query).bind(conn);
            await query("insert into book set ?",book);
        res.status(200).json({
        msg:req.file , 
        }) 
    }
    catch(err){
        console.log(err);
        res.status(500).json();
    }
    }
    );
// 2- update
router.put("/:id",admin,  upload.single("image"),
body("Title").isString().withMessage("please enter a valid book title").isLength({min:10})
.withMessage("book title should be at least 10 characters"),

body("Author").isString().withMessage("please enter a valid Author")
.isLength({ min :8})
.withMessage("Author should be (8-20) character"),

// body("Category").isString().withMessage("please enter a valid category")
// .isLength({ min :8})
// .withMessage("Category should be (8-20) character"),

// body("ISBN").isString().withMessage("please enter a valid ISBN")
// .isLength({ min :8 , max:10})
// .withMessage("ISBN should be (8-10) character"),

// body("RankNumber").isInt().withMessage("please enter a valid RankNumber")
// .isLength({ min :4,max : 6})
// .withMessage("RankNumber should be (4-6) character"),

// body("BookPrice").isInt().withMessage("please enter a valid BookPrice")
// .isLength({min : 2 , max :3})
// .withMessage("BookPrice should be (50-500) $"),
async (req ,res) =>

{
    try{
        const query = util.promisify(conn.query).bind(conn);
        const errors = validationResult(req) ;
        if(!errors.isEmpty()){
           res.status(400).json({errors:errors.array()});
        }
        // cheack book is exist or no 
        const book= await query("select * from book where id = ?",[req.params.id]);
       if (!book[0]){
        res.status(404).json({msg:"book is not exist "});
       }
       // update book data 
       const book_update = {
                Title:req.body.Title,
                Author:req.body.Author,
                Category:req.body.Category,
                ISBN:req.body.ISBN,
                RankNumber:req.body.RankNumber,
                 Photo_URL:req.file.filename,
                Book_Price:req.body.Book_Price
       }
       if (req.file)
       {
        book_update.Photo_URL=req.file.filename;
        // delete old image 
        console.log(book[0].Photo_URL);
        fs.unlinkSync("./upload/" + book[0].Photo_URL);
       }

       await query("update book set ? where id = ?",
       [
        
        book_update,
        book[0].Id
        
       ])
       
      
    res.status(200).json({
    msg:"updated" , 
    }) 
}
catch(err){
    console.log(err);
    res.status(500).json({});
}

}
   );
////// 3- delete
router.delete("/:id",
   admin, 
   
   async (req ,res) =>
   
   {
       try{
           const query = util.promisify(conn.query).bind(conn);
          
           // cheack book is exist or no 
           const book= await query("select * from book where id = ?",[req.params.id]);
          if (!book[0]){
           res.status(404).json({msg:"book is not exist "});
          }
          // delete book data 
         // console.log(book[0].Photo_URL + book[0].id );
           fs.unlinkSync("./upload/" + book[0].Photo_URL);
           await query("delete from book where id = ?",[book[0].Id]);
          
         
       res.status(200).json({
       msg:"deleted" , 
       }) 
   }
   catch(err){
       console.log(err);
       res.status(500).json({});
   }
   
   }
      );
   


// user => list , view 

router.get("/list",authorize,async(req,res) =>
{
    const query = util.promisify(conn.query).bind(conn);
    const books= await query("select * from book");
    books.map(book =>{
        book.Photo_URL = "http://" + req.hostname + ":4000/" + book.Photo_URL
    })
     res.status(200).json(books)
    
}
);

router.post("/books-review",authorize,(req,res) =>
{
    res.status(200).json({
       msg:"book review" ,
    })
}
);

module.exports= router;
