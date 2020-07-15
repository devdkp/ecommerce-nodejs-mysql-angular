const bcrypt = require('bcrypt');
const saltRounds = 10;

export function generateHash(inputText)
{
    const myPlaintextPassword = inputText;
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        return hash;
    });
}