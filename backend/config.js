const env = process.env.NODE_ENV || 'development';

const credentials = require(`./config/.credentials.${env}`);

module.exports = {credentials}; 
