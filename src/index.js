
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
            let extName = path.extname(file);
            let oldPath = `${ dirPath }/${ oldName }`;
            let uuid = UUID();
            let newName = uuid + extName;
            let newPath = `${ outPath }/${ newName }`;
            if (extName.toLowerCase() == ".png") {
                Sharp(oldPath).toFile(outPath + `/CCC${ uuid }.jpg`);
            }
            else {
                // fs.renameSync(oldPath, newPath);
                fs.copyFileSync(oldPath, newPath);
                console.log(oldPath.green, newPath.red);
            }
        }
    }); 
}

let dirPath = "/Users/jimao/Desktop/训练图片";
let outPath = "/Users/jimao/Desktop/newDir";
cpRenameDirFile(dirPath, outPath);



// let dirPath = "/Users/jimao/Desktop/训练图片/来自：MI 8/1982775886";
// let files = fs.readdirSync(dirPath);
// files.forEach(file => {
//     let stat = fs.statSync(`${ dirPath }/${ file }`);
//     if (stat.isDirectory()) {

//     }
//     else {
//         let oldName = file;
//         let extName = path.extname(file);
//         let newName = UUID() + extName;
//         let oldPath = `${ dirPath }/${ oldName }`;
//         let newPath = `${ dirPath }/${ newName }`;
//         console.log(oldPath.green, newPath.red);
//         // fs.renameSync()
//         fs.renameSync(oldPath, newPath);
//     }
// });