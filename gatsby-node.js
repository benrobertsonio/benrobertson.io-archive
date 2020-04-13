/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const glob = require('glob');
const path = require('path');
const fs = require('fs');

exports.onPostBuild = () => {
  // Configure where the functions are kept and where we want to move them.
  const srcLocation = `${__dirname}/`;
  const outputLocation = `${__dirname}/public/`;



  // Get all the functions.
  const modules = glob.sync('firebase.json', { cwd: srcLocation });
  modules.forEach(src => {
    const moduleSrc = path.join(srcLocation, src);
    const moduleOut = path.join(outputLocation, path.basename(src, path.extname(src)) + '.json');

    // Copy file to new location.
    fs.copyFile(moduleSrc, moduleOut, (err) => {
      if (err) {
        throw err;
      }
    });
  });
};
