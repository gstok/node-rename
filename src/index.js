
const fs = require("fs");
const path = require("path");
const UUID = require("uuid/v4");
const Sharp = require("sharp");
const colors = require("colors");

function cpRenameDirFile (dirPath, outPath) {
    let files = fs.readdirSync(dirPath);
    files.forEach(file => {
        let fullPath = `${ dirPath }/${ file }`;
        let stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            cpRenameDirFile(fullPath, outPath);
        }
        else {
            let oldName = file;
            let extName = path.extname(file).toLowerCase();
            let oldPath = `${ dirPath }/${ oldName }`;

            let uuid = UUID().replace(/-/g, "");
            let newName;
            let newPath;
            
            if (extName == ".jpg" || extName == ".jpeg") {
                newName = uuid + extName;
                newPath = `${ outPath }/${ newName }`;
                fs.copyFileSync(oldPath, newPath);
                console.log(oldName.red, newName.green);
            }
            else if (extName == ".png") {
                newName = `${ uuid }.jpg`;
                newPath = `${ outPath }/${ newName }`;
                Sharp(oldPath).toFile(newPath);
                console.log(oldName.red, newName.green);
            }
        }
    }); 
}

let dirPath = "/Users/jimao/Desktop/训练图片";
let outPath = "/Users/jimao/Desktop/newDir";
cpRenameDirFile(dirPath, outPath);

