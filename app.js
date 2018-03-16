const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes");

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

const argv = yargs
                .command('add', 'Add a new note', {
                    title: titleOptions,
                    body: bodyOptions
                })
                .command('list', 'List all notes')
                .command('read', 'Read a note', {
                    title: titleOptions
                })
                .command('remove', 'Remove a note', {
                    title: titleOptions
                })
                .help()
                .argv;

var command = 
                // yargs
                // .command('add', 'add a new note', {
                //     title: {
                //         describe: 'Title of note',
                //         demand: true,
                //         alias: 't'
                //     }
                // })
                // .help()
                argv
                ._[0];

if (command == 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created');
        notes.logNote(note);
    } else {
        console.log("note title already taken");
    }
} else if (command == 'list'){
    var allNotes = notes.getAllNotes();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => {
        notes.logNote(note);
    });
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