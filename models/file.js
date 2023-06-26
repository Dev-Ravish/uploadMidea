const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    
    email:{
        type: String,
    },
    
    tags:{
        type: String
    },

    fileUrl: {
        type: String,
    },


});

fileSchema.post("save", async function(doc){
    console.log("DOC", doc);

    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })


    let info = await transporter.sendMail({
        from: "Ravish",
        to: doc.email,
        subject: "New File has been uploaded",
        html: `<h2>FILE UPLOADED !</h2>  <p>VIEW HERE :  <a href=${doc.fileUrl}> ${doc.fileUrl}</a></p>   `
    })

    console.log(info);
})

const file = mongoose.model("File", fileSchema);
module.exports = file;
