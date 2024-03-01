require('dotenv').config()
const express = require('express')
const sequelize =require('./db.js')
const models = require('./models/models.js')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index.js')
const PORT=process.env.PORT || 5000;
const path = require('path')
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')

const app = express()
app.use(cors())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname,'static')))
app.use(express.json())
app.use('/api', router)

// обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async ()=>{
    try {
        await sequelize.authenticate() 
        await sequelize.sync();
        app.listen(PORT, console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();
