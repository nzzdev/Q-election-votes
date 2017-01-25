var parliamentsInfo = {};
if (process.env.PARLIAMENTS !== undefined) {
  parliamentsInfo = JSON.parse(process.env.PARLIAMENTS);
} 

var parliaments = parliamentsInfo.parliaments;
if (parliaments === undefined) {
  parliaments = {};
}

module.exports = parliaments;
