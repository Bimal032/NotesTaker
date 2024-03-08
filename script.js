const container = document.querySelector(".container");
const newadd = document.querySelector(".newContainer");
const titleTag = container.querySelector("input");
const descTag = container.querySelector("textarea");
const btn = document.querySelector("#save");

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let track = false;
let notesId;


function showNotes() {
    if (!notes) return;
    document.querySelectorAll(".note").forEach((li) => li.remove());
    notes.forEach((note, id) => {
        let filterDesc = note.description.replaceAll("\n", "<br/>");
        let liTag = `<li class="note">
                          <div class="details">
                              <p>${note.title}</p>
                              <span>${filterDesc}</span>
                          </div>
                          <div class="bottom-content">
                              <div class="settings">
                                  <button onclick="deleteNote(${id})">Delete</button>
                              </div>
                          </div>
                      </li>`;
        newadd.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

btn.addEventListener("click", (e) => {
    e.preventDefault();
    let title = titleTag.value.trim(),
        description = descTag.value.trim();

    if (title || description) {
        let noteInfo = { title, description };
        if (!track) {
            notes.push(noteInfo);
        } else {
            track = false;
            notes[notesId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
    }
});

function deleteNote(noteId) {
    let Delbtn = confirm("Do you want to delete this note?");
    if (!Delbtn) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}
