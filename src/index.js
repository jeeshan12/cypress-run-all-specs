const path = require("path");
const fs = require("fs");
const Glob = require("glob").GlobSync;

function runAllSpecs(options = {}) {
  const defaultFilesData = {
    specsPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    outputfile: "cypress/e2e/allspec.cy.js",
    cypressBaseFolder: "cypress/e2e/",
  };

  options = { ...defaultFilesData, ...options };
  const cypressBaseFolder = options.cypressBaseFolder;

  if (fs.existsSync(options.outputfile)) {
    fs.unlink(options.outputfile, (err) => {
      if (err)
        return new Error(
          `Error in deleting the file at location ${options.outputfile}. Error that occured is ${err}`
        );
    });
    console.log(
      "Already exists a Outputfile. Deleting this file to genearte a new Outputfile."
    );
  }
  const glob = new Glob(options.specsPattern);
  if (!glob.found.length) {
    throw new Error(
      `Error in reading all the spec files. Check whether you have defined correct specs pattern ${specsPattern}`
    );
  }
  const files = glob.found
    .map((file) => file.replace(cypressBaseFolder, ""))
    .map((spec) => `import './${spec}'`)
    .join(";\n")
    .trim();
  fs.writeFileSync(options.outputfile, files);
  console.log(`Files imported are :\n${files}\n`);
}

runAllSpecs();
