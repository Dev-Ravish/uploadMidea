const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log("Database connected successfully."))
    .catch(error => {
        console.log("Unable to connect to database");
        console.log(error.message);
    });
};

