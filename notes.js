console.log("Starting notes.js");

const fs = require("fs");

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch(e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    
    var note = {
        title, 
        body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);
    
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAllNotes = () => {
    console.log("Getting all notes");
};

var readNote = (title) => {
    var notes = fetchNotes();

    var foundNote = notes.filter((note) => note.title === title);
    if (foundNote) return foundNote[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
    console.log('----------');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote,
    getAllNotes,
    readNote,
    removeNote,
    logNote
}