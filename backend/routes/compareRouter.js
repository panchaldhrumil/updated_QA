// // boxlabelrouter.js
// const express = require('express');
// const router = express.Router();
// const { sql, config } = require('../db');

// router.post('/compare', async (req, res) => {
//   const { AssemblyLotNumber, WaferLotNumber, LotQuantity, Marking ,AssemblyDateCode, BoxLabelDateCode } = req.body;

//   try {
//     const pool = await sql.connect(config);
//     await pool.request()
//       .input('AssemblyLotNumber', sql.VarChar, AssemblyLotNumber)
//       .input('WaferLotNumber', sql.VarChar, WaferLotNumber)
//       .input('LotQuantity', sql.Int, LotQuantity)
//       .input('Marking', sql.VarChar, Marking)
//       .input('AssemblyDateCode', sql.Date, AssemblyDateCode)
//       .input('BoxLabelDateCode', sql.Date, BoxLabelDateCode)
//       .query(`
//         INSERT INTO QaData (AssemblyLotNumber, WaferLotNumber, LotQuantity, Marking, AssemblyDateCode , BoxLabelDateCode)
//         VALUES (@AssemblyLotNumber, @WaferLotNumber, @LotQuantity, @Marking, @AssemblyDateCode , @BoxLabelDateCode)
//       `);

//     res.status(201).json({ message: 'compare data saved' });
//   } catch (err) {
//     console.error('Error inserting compare Data:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;
