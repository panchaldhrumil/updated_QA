const express = require('express');
const router = express.Router();
const multer = require('multer');
const { sql, config } = require('../db');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs').promises;

// Configure multer (store file in disk)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/');
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, buf) {
      if (err) return cb(err);
      const fn = buf.toString('hex') + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});
const upload = multer({ storage: storage });

router.post('/SubmitAll', upload.single('report'), async (req, res) => {
  const file = req.file;
  // Extract compare data
    const {
      AssemblyLotNumber, WaferLotNumber, LotQuantity,
      Marking, AssemblyDateCode, BoxLabelDateCode,
      InspectionQuantityInspected, InspectionResult,
      Tape, Tube
    } = req.body;

    if ( !AssemblyLotNumber || !WaferLotNumber || !LotQuantity || !Marking || !AssemblyDateCode || !BoxLabelDateCode || !InspectionQuantityInspected || !InspectionResult || !Tape || !Tube) {
    return res.status(400).send("No fields should be empty");
  }

  try {
    const pool = await sql.connect(config);
    const request = pool.request() ;

    // Log req.body for debugging
    console.log('Received req.body:', req.body);
    console.log('Received file:', file);

// Parse tape and tube data directly from req.body
    const tapeData = Array.isArray(Tape) ? Tape : [];
    const tubeData = Array.isArray(Tube) ? Tube : [];

// Log parsed data for debugging
    console.log('Parsed tapeData:', tapeData);
    console.log('Parsed tubeData:', tubeData);



      // Set SQL inputs using tape and tube objects
      request
      .input('AssemblyLotNumber', sql.VarChar, AssemblyLotNumber)
      .input('WaferLotNumber', sql.VarChar, WaferLotNumber)
      .input('LotQuantity', sql.Int, parseInt(LotQuantity))
      .input('Marking', sql.VarChar, Marking)
      .input('AssemblyDateCode', sql.Date, AssemblyDateCode)
      .input('BoxLabelDateCode', sql.Date, BoxLabelDateCode)
      .input('InspectionQuantityInspected', sql.Int, parseInt(InspectionQuantityInspected))
      .input('InspectionResult', sql.VarChar, InspectionResult)
      .input('TapeData', sql.NVarChar(sql.MAX), JSON.stringify(tapeData))
      .input('TubeData', sql.NVarChar(sql.MAX), JSON.stringify(tubeData));

      // Handle file upload (only for the first row)
      if (file) {
        const fileBuffer = await fs.readFile(file.path);
        request
          .input('InspectionFileName', sql.VarChar, file.originalname)
          .input('InspectionFileData', sql.VarBinary(sql.MAX), fileBuffer)
          .input('InspectionFileType', sql.VarChar, file.mimetype);
      } else {
        request
          .input('InspectionFileName', sql.VarChar, null)
          .input('InspectionFileData', sql.VarBinary(sql.MAX), null)
          .input('InspectionFileType', sql.VarChar, null);
      }


    await request.query(`
      INSERT INTO QaData (
        AssemblyLotNumber, WaferLotNumber, LotQuantity, Marking,
        AssemblyDateCode, BoxLabelDateCode,
        InspectionQuantityInspected, InspectionResult,
        TapeData, TubeData,
        InspectionFileName, InspectionFileData, InspectionFileType
      ) VALUES (
        @AssemblyLotNumber, @WaferLotNumber, @LotQuantity, @Marking,
        @AssemblyDateCode, @BoxLabelDateCode,
        @InspectionQuantityInspected, @InspectionResult,
        @TapeData, @TubeData,
        @InspectionFileName, @InspectionFileData, @InspectionFileType
      );
    `);
    

    // Clean up uploaded file
    if (file) {
      await fs.unlink(file.path);
    }

    res.status(201).json({ message: 'data saved' });
  } catch (err) {
    console.error('Error inserting Data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;