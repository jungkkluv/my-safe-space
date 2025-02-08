// نافذة الترحيب
const popup = document.getElementById("popup");
popup.addEventListener("click", () => {
    popup.style.display = "none";
});

// إدخال النوت وعرضها
const noteInput = document.getElementById("noteInput");
const doneButton = document.getElementById("doneButton");
const notesContainer = document.getElementById("notesContainer");

// تحميل النوتات المحفوظة من Local Storage
let notes = JSON.parse(localStorage.getItem("notes")) || [];
renderNotes();

doneButton.addEventListener("click", () => {
    const text = noteInput.value.trim();
    if (text) {
        const note = { id: Date.now(), content: text };
        notes.push(note);
        saveNotes();
        renderNotes();
        noteInput.value = "";
    }
});

function renderNotes() {
    notesContainer.innerHTML = "";
    notes.forEach((note) => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        const noteText = document.createElement("p");
        noteText.textContent = note.content;
        noteDiv.appendChild(noteText);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("trash");
        deleteButton.innerHTML = "🗑️";
        deleteButton.addEventListener("click", () => {
            deleteNote(note.id);
        });
        noteDiv.appendChild(deleteButton);

        notesContainer.appendChild(noteDiv);
    });
}

function deleteNote(id) {
    notes = notes.filter((note) => note.id !== id);
    saveNotes();
    renderNotes();
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}
