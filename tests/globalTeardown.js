const { server } = require('../src/index');
module.exports = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  server.close();
};
