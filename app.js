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
        nots.logNote(note);
    } else {
        console.log("note title already taken");
    }
} else if (command == 'list'){
    notes.getAllNotes();
} else if (command == 'read'){
    var note = notes.readNote(argv.title);
    if (note) {
        debugger;
        console.log('Note read');
        notes.logNote(note);
    } else {
        console.log("Couldn't find a note by that title.")
    }
} else if (command == 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? "Note was removed" : "No note removed";
    console.log(message);
} else {
    console.log('command not recognized');
}