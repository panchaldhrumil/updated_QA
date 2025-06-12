// const express = require('express') ;
// const router = express.Router() ;
// const {sql,config} = require('../db') ;




// router.post('/tape', async (req,res)=>{
//     const {TapeUnit1 , TapeUnit2 , TapeUnit3, TapeMPNLabel, TapeQuantity} = req.body ;

//     console.log("Received tape data:", req.body);

//     try {
//         const pool = await sql.connect(config) ;
//         await pool.request()
//         .input('TapeUnit1',sql.VarChar , TapeUnit1)
//         .input('TapeUnit2',sql.VarChar,TapeUnit2)
//         .input('TapeUnit3',sql.VarChar,TapeUnit3)
//         .input('TapeMPNLabel',sql.VarChar,TapeMPNLabel)
//         .input('TapeQuantity',sql.VarChar,TapeQuantity)
//         .query(`
//             INSERT INTO QaData (TapeUnit1,TapeUnit2,TapeUnit3,TapeMPNLabel,TapeQuantity)
//             VALUES (@TapeUnit1 , @TapeUnit2 , @TapeUnit3 , @TapeMPNLabel , @TapeQuantity)    
//         `) ;
//         res.status(201).json({message:'tape saved'});
//     }catch(err){
//         console.error('Error inserting mpn_label: ',err) ;
//         res.status(500).json({error: 'Internal server error'}) ;
//     }
// })

// module.exports = router ;