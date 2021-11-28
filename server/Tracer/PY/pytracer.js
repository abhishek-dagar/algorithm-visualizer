const { PythonShell } = require("python-shell");
const path = require("path");

const filepath = path.join(__dirname);
const runPython=(code)=>{
    
    let options = {
      mode: "text",
      pythonOptions: ["-u"],
      scriptPath: filepath,
      args: [code],
    };
    let commands;
    PythonShell.run("pyRunner.py", options, function (err, result) {
      if (err) console.log(err.message);
      commands = JSON.parse(result);
      // res.send(result.toString())
      return commands
    });
    // return commands
}

module.exports={
    runPython:runPython,
}
