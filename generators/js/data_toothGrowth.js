//
// Generate code to pull toothGrowth.csv from GitHub.
// FIXME: what is the 'data' value after the 'readCSV' call?
//
Blockly.JavaScript['data_toothGrowth'] = (block) => {
  const URL = 'https://raw.githubusercontent.com/tidyblocks/tidyblocks/master/data/toothGrowth.csv'
  return `readCSV('${URL}')`
}
