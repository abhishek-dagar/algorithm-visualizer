const fs = require("fs");
const path = require("path");

const dirCode = path.join(__dirname,"java/Codes");

if(!fs.existsSync(dirCode)){
    fs.mkdirSync(dirCode,{recursive:true});
}

const generateFile = async(name,code)=>{
    const filename = name
    const filepath = path.join(dirCode,filename);
    await fs.writeFileSync(filepath,code);
    return filepath;
}
const deleteFile = async(path)=>{
    await fs.unlinkSync(path);
    return;
}



module.exports={
    generateFile:generateFile,
    deleteFile: deleteFile
}