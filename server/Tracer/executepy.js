const path = require("path");
const { PythonShell } = require("python-shell");

const runpy = (code) => {
  const filepath = path.join(__dirname, "PY");
  let options = {
    mode: "text",
    pythonOptions: ["-u"],
    scriptPath: filepath,
    args: [code],
  };
  return new Promise((resolve,reject)=>{
    PythonShell.run("pyRunner.py", options, (err, result) => {
        if (err) reject(err.message);
        if (result) {
          const commands = JSON.parse(result[result.length - 1]);
          resolve(commands.commands);
        }
      });
  })
};

module.exports={
    runpy:runpy
}