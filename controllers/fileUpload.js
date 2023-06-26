const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res ) => {

    try{
        const file = req.files.file;

        const path = __dirname + "/files/"  + Date.now() + `.${file.name.split(".")[1]}`;
        console.log(path);
        file.mv(path, (error) => {
            console.log(error);
        });
    
        res.json({
            success: true,
            message: 'File Uploaded successfully'
        })
    
    }catch(error){
        console.log("Error in uploaing data.");
        res.status(500).json({
            success: false,
            message: " Internal server error",
            data: error.message       
        })
    }
    
}

//checking if the type of the file is permitted or not
function checkFileType(fileType, permitted) {
    return permitted.includes(fileType);
};

async function cloudinaryUpload(file, folder, quality) {
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
};

exports.imageUpload = async (req, res) =>{
    try{

        const {name, email, tags} = req.body;
        const file = req.files.imageFile;
        
        const permittedType = ["jpeg", "jpg", "png"]
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!checkFileType(fileType, permittedType)){
            return res.status(400).json({
                success: false,
                message: "File type is not permitted."
            })
        }

        const response = await cloudinaryUpload(file, "ravishcloud");
        console.log(response);

        const saveFile = await File.create({
            name, email, tags, fileUrl: response.secure_url
        });

        res.status(200).json({
            success: true,
            data: saveFile,
            message: "Image uploaded successfully"
        })

    }catch(error){
        console.error(error);
        console.log("Unable to upload image.");
        return res.status(400).json({
            successs: false,
            error : error.message,
            message:"Something went wrong."
        })
    }
};

exports.videoUpload = async (req, res) => {

    try{

        //fetch data
        const { name, email, tags} = req.body;
        const file = req.files.videoFile;

        //check file extension
        const permittedType = ["mp4", "mov", "mkv"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!checkFileType(fileType, permittedType)){
            return res.status(400).json({
                success: false,
                message: "File type is not permitted"
            });
        }

        //limit to 5MB or whatever if required

        //save to the cloudinary
        const response = await cloudinaryUpload(file, "ravishcloud");
        //save data to database
        console.log(response);
        const savedFile = await File.create({
            name, email, tags, fileUrl: response.secure_url
        });

        //send response
        res.status(200).json({
            success: true,
            data: savedFile,
            message: 'Video Uploaded Successfully.'
        })

    }catch(error){
        console.error(error);
        console.log("Unable to upload Video.");
        return res.status(400).json({
            successs: false,
            error : error.message,
            message:"Something went wrong."
        })       
    }
}


exports.imageReduceUpload = async (req, res) =>{
    try{

        const {name, email, tags} = req.body;
        const file = req.files.imageFile;
        
        const permittedType = ["jpeg", "jpg", "png"]
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!checkFileType(fileType, permittedType)){
            return res.status(400).json({
                success: false,
                message: "File type is not permitted."
            })
        }

        const response = await cloudinaryUpload(file, "ravishcloud", 80);
        console.log(response);

        const saveFile = await File.create({
            name, email, tags, fileUrl: response.secure_url
        });

        res.status(200).json({
            success: true,
            data: saveFile,
            message: "Reduced image uploaded successfully"
        })

    }catch(error){
        console.error(error);
        console.log("Unable to upload image.");
        return res.status(400).json({
            successs: false,
            error : error.message,
            message:"Something went wrong."
        })
    }
};