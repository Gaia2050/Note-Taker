const express = require('express');
const path = require('path'); 
const fs = require('fs');
const PORT = 3000;

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.get('/', deliverIndexHTML);
app.get('/notes', deliverNotesHTML);
app.get('/api/notes', deliverNotes);
app.post('/api/notes', createNote);
app.delete('/api/notes/:id', deleteNote);
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});

//controller function;

function deliverIndexHTML(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
}


function deliverNotesHTML(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
}


function deliverNotes(req, res) {   
    const notes = getDb();
    res.json(notes);
}

function createNote( req, res) {
    const newNote = req.body;
    newNote.id = Date.now();
    const notes = getDb();
    notes.push(newNote);
    saveDb(notes);
}

function deleteNote(req, res) {
    const id = Number(req.params.id);
    const notes = getDb();
    const filterNotes = notes.filter(n => n.id!==id);
    saveDb(filterNotes);
}

//helper functions 
function getDb() {
    const data = fs.readFileSync('./db/db.json');  
    return JSON.parse(data);     //reading the json file :) 4 express
}

function saveDb(data) {
    fs.writeFileSync('./db/db.json', JSON.stringify(data));

}
