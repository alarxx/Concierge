/** И у .env есть свои плюсы и у этого решения */
const env = process.env.NODE_ENV || 'development';
console.log(env)
const credentials = require(`./config/.credentials.${env}`);

module.exports = {credentials}; 
