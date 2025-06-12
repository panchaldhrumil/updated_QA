// backend/app.js
const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require("./routes/userRouter");
// const LotTravellerRouter = require('./routes/LotTravellerRouter') ;
// const BoxLabelRouter = require('./routes/BoxLabelRouter') ;
const TapeRouter = require('./routes/TapeRouterr') ;
const TubeRouter = require('./routes/TubeRouter') ;
const CompareRouter = require('./routes/compareRouter')
const SubmitAllRouter = require('./routes/SubmitAllRouter') ;
const cookieParser = require('cookie-parser');
const path =  require('path') ;
const { compare } = require('bcrypt');
const port = 3000;
// const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// const db = require("./config/MongooseConnect") ;



// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({extended : true})) ;
app.use(cookieParser()) ;
// app.use('/api/auth', authRoutes);


// Mount the routers
app.use('/api', userRouter);
app.use('/api',SubmitAllRouter) ;
// app.use('/api', TapeRouter);
// app.use('/api', TubeRouter);
// app.use('/api',CompareRouter) ;
// app.use('/api', require('./routes/inspectionRouter'));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.get('/',(req,res)=>{
  res.send("heyy kaise hoo") ;
})



app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});








