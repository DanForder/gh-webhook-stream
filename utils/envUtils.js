"use strict";
exports.__esModule = true;
exports.getEnvironmentVariable = void 0;
var getEnvironmentVariable = function (variable) {
    var _a;
    if (process.env[variable] === undefined) {
        console.log("Can't find env variable with name ".concat(variable, "."));
    }
    return (_a = process.env[variable]) !== null && _a !== void 0 ? _a : "";
};
exports.getEnvironmentVariable = getEnvironmentVariable;
