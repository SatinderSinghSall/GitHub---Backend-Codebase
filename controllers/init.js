const fs = require("fs").promises;
const path = require("path");

async function initRepo() {
  const reportPath = path.resolve(process.cwd(), ".satinderGit");
  const commitPath = path.join(reportPath, "commits");

  try {
    await fs.mkdir(reportPath, { recursive: true });
    await fs.mkdir(commitPath, { recursive: true });
    await fs.writeFile(
      path.join(reportPath, "config.json"),
      JSON.stringify({ bucket: process.env.S3_BUCKET_NAME })
    );
    console.log("Repository initialized successfully.");
  } catch (error) {
    console.log("Error Initializing repository:", error.message);
  }
}

module.exports = { initRepo };
