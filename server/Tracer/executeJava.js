const { exec } = require("child_process");
const path = require("path");

const outputPath = path.join(__dirname,"java/Codes");
const executejava = (filepath) => {
    const outputfile = path.basename(filepath).split(".")[0];
    console.log(outputPath);
    return new Promise((resolve,reject)=>{
        exec(
            `javac ${filepath} && cd ${outputPath} && java ${outputfile}`,(error,stdout,stderr)=>{
                if(error) {reject(error);}
                const classfile=outputPath+"/"+outputfile+'.class'
                resolve({stdout,classfile});
            }
        )
    })
}
module.exports={
    executejava:executejava
}