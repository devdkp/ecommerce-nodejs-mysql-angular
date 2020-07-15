"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = void 0;
const bcrypt = require('bcrypt');
const saltRounds = 10;
function generateHash(inputText) {
    const myPlaintextPassword = inputText;
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        return hash;
    });
}
exports.generateHash = generateHash;
//# sourceMappingURL=utils-method.js.map