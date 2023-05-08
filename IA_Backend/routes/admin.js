const express = require('express')
const router = express.Router()
const conn = require("../db/dbConnection");
const admin = require("../middleware/admin")
const util = require("util")
const authorize = require("../middleware/authorize")

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
router.post("/approve/:id",admin,async(req,res) =>
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
router.delete("/rejected/:id",admin,async(req,res) =>
{
    const query= util.promisify(conn.query).bind(conn);
    const books= await query("select * from user_account where user_id =?",[req.params.id]);
   // console.log(books[0]);
   
    await query ("DELETE FROM user_account WHERE user_id= ? ", [req.params.id])
     
    
     res.status(200).json(books)
    
}
);


// PUT route to accept a borrow request by book_ID
router.put("/borrow/:id/accept",
//  admin,
  async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    const borrow = await query("SELECT * FROM Borrow_Books WHERE id = ?", [
      req.params.id,
    ]);
    if (!borrow[0]) {
      res.status(404).json({ ms: "Borrow request not found!" });
    } else {
      await query("UPDATE Borrow_Books SET status = '1' WHERE id = ?", [
        req.params.id,
      ]);
      res.status(200).json({ ms: "Borrow request accepted successfully" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


//2-REJECT
router.delete("/borrow/:id/reject",
//  admin,
  async (req, res) => {
  try {
      // 1- CHECK IF REQUEST EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const borrow = await query("select * from Borrow_Books where id = ?", [
          req.params.id,
      ]);
      if (!borrow[0]) {
          res.status(404).json({ ms: "borrow request not found !" });
      }
      else {
          const query = util.promisify(conn.query).bind(conn);
          // Delete the row with the specified ID from the books table
          await query("DELETE FROM Borrow_Books WHERE id = ?", [req.params.id]);
          res.status(200).json({ message: "borrow request rejected successfully" });
      }
      
        
  } catch (err) {
      res.status(500).json(err);
  }
}
);


// borrow book ,view
router.get("/borrowed",authorize,async(req,res) =>
{
    try{const query = util.promisify(conn.query).bind(conn);
   // const countBorrowRequests = await query("SELECT COUNT(*) AS count FROM borrow");
   // if(countBorrowRequests > 0){
      
        
    //}
    const data=await query("select * from Borrow_Books ");
    const data2=[{}];
    for(let i=0;i<data.length;i++)
    {
      const arr=await query(`select Title from book where id=${data[i].book_id}`);
      data[i].name=arr[0].Title;
    }
    
     res.status(200).json(data)}
    catch(err){
      console.log(err);
    }
}
);

module.exports= router;
