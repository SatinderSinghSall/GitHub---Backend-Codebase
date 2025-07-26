const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function commitChanges(message) {
  const repoPath = path.resolve(process.cwd(), ".satinderGit");
  const stagedPath = path.join(repoPath, "staging");
  const commitPath = path.join(repoPath, "commits");
  const files = await fs.readdir(stagedPath);

  try {
    const commitId = uuidv4();
    const commitDir = path.join(commitPath, commitId);
    await fs.mkdir(commitDir, { recursive: true });

    for (const file of files) {
      await fs.copyFile(
        path.join(stagedPath, file),
        path.join(commitDir, file)
      );
    }

    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ message, date: new Date().toISOString() }, null, 2)
    );

    console.log(`Commit ${commitId} created with the message ${message}`);
  } catch (error) {
    console.log(`Error committing message ${message}:`, error, error.message);
  }
}

module.exports = { commitChanges };
