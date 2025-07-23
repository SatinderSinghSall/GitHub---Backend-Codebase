const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { addFile } = require("./controllers/add");
const { commitChanges } = require("./controllers/commit");
const { pushChanges } = require("./controllers/push");
const { pullChanges } = require("./controllers/pull");
const { revertChanges } = require("./controllers/revert");

yargs(hideBin(process.argv))
  .command("init", "Initialize a new repository.", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the repository.",
    (yargs) => {
      yargs.positional("file", {
        describe: "The file to add to the staging area.",
        type: "string",
      });
    },
    addFile
  )
  .command(
    "commit <message>",
    "Commit changes to the repository.",
    (yargs) => {
      yargs.positional("message", {
        describe: "The commit message.",
        type: "string",
      });
    },
    commitChanges
  )
  .command("push", "Push changes to the remote repository.", {}, pushChanges)
  .command("pull", "Pull changes from the remote repository.", {}, pullChanges)
  .command("revert", "Revert changes in the repository.", {}, revertChanges)
  .demandCommand(1, "You need at least one command before moving on.")
  .help().argv;
