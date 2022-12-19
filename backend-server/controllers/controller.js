const os = require("os");
const path = require("path");
const { hugoContentSource } = require("../constants/constant");
const getDirectories = require("../helpers/directory");
const createFile = require("../helpers/fileCreation");

const filesController = (req, res) => {
  const { directory, files } = req.payload;
  try {
    if (files.length >= 2) {
      files.map((file) => {
        const destination =
          directory !== "root"
            ? path.join(
                os.homedir(),
                process.env.HUGO_SOURCE,
                directory,
                file.filename
              )
            : path.join(os.homedir(), process.env.HUGO_SOURCE, file.filename);
        createFile(destination, file);
      });
    } else {
      const destination =
        directory !== "root"
          ? path.join(
              os.homedir(),
              process.env.HUGO_SOURCE,
              directory,
              files.filename
            )
          : path.join(os.homedir(), process.env.HUGO_SOURCE, files.filename);
      createFile(destination, files);
    }
    return res.response("success").code(200);
  } catch (err) {
    return res.code(500);
  }
};

const directoryController = async (req, res) => {
  const dirName = path.join(os.homedir(), hugoContentSource);
  const directories = await getDirectories(dirName);
  return directories;
};

module.exports = { filesController, directoryController };
