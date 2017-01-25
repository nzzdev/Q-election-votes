var parliaments = {};
if (process.env.PARLIAMENTS !== undefined) {
  parliaments = JSON.parse(process.env.PARLIAMENTS);
}

module.exports = parliaments;
