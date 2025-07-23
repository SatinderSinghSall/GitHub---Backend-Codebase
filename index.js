const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { addFile } = require("./controllers/add");

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
  .demandCommand(1, "You need at least one command before moving on.")
  .help().argv;
