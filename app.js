console.log("Starting app.js");

const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes");

const argv = yargs.argv;

var command = argv._[0];


// console.log("Cammand:", command);
console.log("Yargs:", argv);

if (command == 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created');
        console.log('----');
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    } else {
        console.log("note title already taken");
    }
} else if (command == 'list'){
    notes.getAllNotes();
} else if (command == 'read'){
    notes.readNote(argv.title);
} else if (command == 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? "Note was removed" : "No note removed";
    console.log(message);
} else {
    console.log('command not recognized');
}