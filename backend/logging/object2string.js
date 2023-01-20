const util = require("util");
module.exports = (obj) => {
    return util.inspect(obj, {showHidden: false, depth: null, colors: true})
}