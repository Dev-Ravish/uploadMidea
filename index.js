//import required files
const express = require("express");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const database  = require("./config/database")


//set port and make app
const PORT = process.env.PORT || 4000;
const app = express();


//import routes
const fileRoute = require("./routers/fileUpload");

//cloudinary
const cloud = require("./config/cloudinary");
cloud.cloudinaryConnect();

//middlewares
app.use(express.json());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use("/api/v1", fileRoute);





//port and db connection
app.listen(PORT, () => {
    console.log(`App is listening to the Port ${PORT}`);
});

database.dbConnect();