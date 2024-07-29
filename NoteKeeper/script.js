document.addEventListener('DOMContentLoaded', function () {
  const notesContainer = document.getElementById('notesContainer');
  const noteForm = document.getElementById('noteForm');
  const prevPageButton = document.getElementById('prevPage');
  const nextPageButton = document.getElementById('nextPage');
  const pageInfo = document.getElementById('pageInfo');

  let notes = [];
  let currentPage = 1;
  const notesPerPage = 6;

  noteForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('noteTitle').value;
    const tagline = document.getElementById('noteTagline').value;
    const body = document.getElementById('noteBody').value;

    const newNote = { id: Date.now(), title, tagline, body };
    notes.push(newNote);

    displayNotes();
    noteForm.reset();
  });

  function displayNotes() {
    notesContainer.innerHTML = '';

    const start = (currentPage - 1) * notesPerPage;
    const end = start + notesPerPage;
    const paginatedNotes = notes.slice(start, end);

    paginatedNotes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.innerHTML = `
        <h2>${note.title}</h2>
        <p>${note.tagline}</p>
        <p>${note.body}</p>
        <button onclick="editNote(${note.id})">Edit</button>
        <button onclick="deleteNote(${note.id})">Delete</button>
      `;
      notesContainer.appendChild(noteElement);
    });

    updatePaginationInfo();
  }

  function updatePaginationInfo() {
    const totalPages = Math.ceil(notes.length / notesPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
  }

  prevPageButton.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      displayNotes();
    }
  });

  nextPageButton.addEventListener('click', function () {
    const totalPages = Math.ceil(notes.length / notesPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayNotes();
    }
  });

  window.deleteNote = function (id) {
    notes = notes.filter(note => note.id !== id);
    displayNotes();
  };

  window.editNote = function (id) {
    const note = notes.find(note => note.id === id);
    if (note) {
      document.getElementById('noteTitle').value = note.title;
      document.getElementById('noteTagline').value = note.tagline;
      document.getElementById('noteBody').value = note.body;
      
      notes = notes.filter(note => note.id !== id); // Remove the note being edited
      displayNotes();
    }
  };

  displayNotes();
});