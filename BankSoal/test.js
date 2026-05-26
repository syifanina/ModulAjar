const fs = require('fs');
try {
    const code = fs.readFileSync('script.js', 'utf8');
    new Function(code);
    console.log("No syntax error in JS");
} catch (e) {
    console.log("Error:", e);
}
