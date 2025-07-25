const fs = require("fs").promises;
const path = require("path");

async function addFile(filePath) {
  const reportPath = path.resolve(process.cwd(), ".satinderGit");
  const stagingPath = path.join(reportPath, "staging");
  try {
    await fs.mkdir(path.dirname(stagingPath), { recursive: true });
    const filename = path.basename(filePath);
    await fs.copyFile(filePath, path.join(stagingPath, filename));
    console.log(`File ${filename} added to the staging area.`);
  } catch (error) {
    console.log(`Error adding file ${filename}:`, error.message);
  }
}

module.exports = { addFile };
