const { readdir } = require('fs').promises;
const os = require("os")

let dropDown = {}
const getFileList = async (dirName) => {
    let files = [];
    const items = await readdir(dirName, { withFileTypes: true });
    // console.log(items)
    for (const item of items) {
        if (item.isDirectory()) {
            // console.log(item)
            files = [
                ...files,
                ...(await getFileList(`${dirName}/${item.name}`)),
            ];
        } else {
            files.push(`${dirName}/`);
        }
    }
    return files; 
};

getFileList(os.homedir()+"/Desktop/hugo-test/content").then((files) => {
    console.log(files);
});

// blogs
//  tutorial
//    one
//     file.md
//    two
//     file.md

// const path = require("path")
// const folder = path.dirname("posts/insta/feed/sub/file.md").split('/')
// console.log(folder)


