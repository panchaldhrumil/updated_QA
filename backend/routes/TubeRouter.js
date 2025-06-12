// const express = require('express') ;
// const router = express.Router() ;
// const {sql , config} = require('../db') ;


// router.post('/tube' , async (req , res)=>{
//     const {TubeUnit1 , TubeUnit2 , TubeUnit3 , TubeQuantity}= req.body ;

//     try{
//         const pool = await sql.connect(config) ;
//         await pool.request()
//         .input('TubeUnit1',sql.VarChar,TubeUnit1)
//         .input('TubeUnit2',sql.VarChar,TubeUnit2)
//         .input('TubeUnit3',sql.VarChar,TubeUnit3)
//         .input('TubeQuantity',sql.VarChar , TubeQuantity)
//         .query(`
//             INSERT INTO QaData (TubeUnit1 , TubeUnit2 , TubeUnit3,TubeQuantity) VALUES ( @TubeUnit1 , @TubeUnit2 , @TubeUnit3 , @TubeQuantity )
//         `) ;
//          res.status(201).json({ message: 'tube saved' });
//   } catch (err) {
//       console.error('error inserting tube : ',err) ;
//       res.status(500).json({error:'internal server error'})
//     }
// }) ;

// module.exports = router ;