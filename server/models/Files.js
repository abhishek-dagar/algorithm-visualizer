class files{
    constructor(path,name){
        // this.path = path;
        this.name = name;
        this.content = '';
        this.refresh(path);
    }
    refresh(path){
        const fs = require('fs');
        this.content = fs.readFileSync(path,'utf-8')
    }
    toJson(){
        const {name, content } = this;
        return { name, content};
    }
}
module.exports={
    files:files
}