const noteContainer = document.getElementById("app");
const addNoteButton = noteContainer.querySelector(".add-note");

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    noteContainer.insertBefore(noteElement, addNoteButton);
    
});
addNoteButton.addEventListener("click", () => addNote())

function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes") || "[]" );

}

function saveNotes(notes) {
    localStorage.setItem("stickynotes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const element = document.createElement("textarea");

    element.classList.add ("note");
    element.value = content;
    element.placeholder = "Click to edit";
    
    element.addEventListener("change", () => {
        updateNote(id, element.value);

    })

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you want to delete this note?");
        if (doDelete) {
            deleteNote(id, element);
        }
    });
    
    return element;

}

function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 10000000000),
        content: ""

    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content)
    noteContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);

}
function updateNote(id, newContent){
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];
    targetNote.content = newContent;
    saveNotes(notes);
}
function deleteNote(id, element){
    const notes = getNotes().filter(note => note.id != id);
    saveNotes(notes);
    noteContainer.removeChild(element);}