const del = require('del');

if (process.argv.length < 3) {
    console.error("Provide a path");
} else {
    del(process.argv[2]);
}
