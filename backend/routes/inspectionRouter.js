// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { sql, config } = require('../db');
// const path = require('path');
// const crypto = require('crypto');
// const fs = require('fs').promises;

// // Configure multer (store file in memory)

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/');
//   },
//   filename: function (req, file, cb) {
//     crypto.randomBytes(12, function (err, buf) {
//       if (err) return cb(err);
//       const fn = buf.toString("hex") + path.extname(file.originalname);
//       cb(null, fn);
//     })
//   }
// })
// const upload = multer({ storage: storage });


// router.post('/inspection', upload.single('report'), async (req, res) => {
//   const { InspectionQuantityInspected, InspectionResult } = req.body;
//   const file = req.file;

//   try {
//     const pool = await sql.connect(config);
//     const request = pool.request()
//       .input('InspectionQuantityInspected', sql.VarChar, InspectionQuantityInspected)
//       .input('InspectionResult', sql.VarChar, InspectionResult)

//     if (file) {
//       const fileBuffer = await fs.readFile(file.path);
//       request
//         .input('InspectionFileName', sql.VarChar, file.originalname)
//         .input('InspectionFileData', sql.VarBinary(sql.MAX), fileBuffer)
//         .input('InspectionFileType', sql.VarChar, file.mimetype);
//     } else {
//       request
//         .input('InspectionFileName', sql.VarChar, null)
//         .input('InspectionFileData', sql.VarBinary(sql.MAX), null)
//         .input('InspectionFileType', sql.VarChar, null);
//     }

//     await request.query(`
//       INSERT INTO QaData (
//               InspectionQuantityInspected, InspectionResult, InspectionFileName, InspectionFileData, InspectionFileType
//       )
//       VALUES (
//                  @InspectionQuantityInspected, @InspectionResult, @InspectionFileName, @InspectionFileData, @InspectionFileType
//       )
//     `);

//     if (file) {
//       await fs.unlink(file.path);
//     }

//     res.status(201).json({ message: 'Inspection data saved' });
//   } catch (err) {
//     console.error('Error inserting inspection:', err);
//     res.status(500).json({ error: 'Internal server error', details: err.message });
//   }
// });

// module.exports = router, upload;