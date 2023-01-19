/**
 * \x1b[30m: Black
 * \x1b[31m: Red
 * \x1b[32m: Green
 * \x1b[33m: Yellow
 * \x1b[34m: Blue
 * \x1b[35m: Magenta (purple)
 * \x1b[36m: Cyan (light blue)
 * \x1b[37m: White
 * \x1b[90m: Bright black (dark gray)
 * \x1b[91m: Bright red
 * \x1b[92m: Bright green
 * \x1b[93m: Bright yellow
 * \x1b[94m: Bright blue
 * \x1b[95m: Bright magenta
 * \x1b[96m: Bright cyan
 * \x1b[97m: Bright white
 * */
module.exports = {
    green: t => `\x1b[32m${t}\x1b[0m`,
    red: t => `\x1b[31m${t}\x1b[0m`,
    yellow: t => `\x1b[33m${t}\x1b[0m`,
    blue: t => `\x1b[34m${t}\x1b[0m`,
    magenta: t => `\x1b[35m${t}\x1b[0m`,
    cyan: t => `\x1b[36m${t}\x1b[0m`,
    gray: t => `\x1b[90m${t}\x1b[0m`,
    bright_cyan: t => `\x1b[96m${t}\x1b[0m`,
    bright_green: t => `\x1b[92m${t}\x1b[0m`

}