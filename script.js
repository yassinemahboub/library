/* NAVIGATION */

document.querySelector('.add-btn').addEventListener('click', () => {
    document.querySelector('.popup').style.display = "flex";
  })
  
  document.querySelector('.close_btn').addEventListener('click', () => {
    document.querySelector('.popup').style.display = "none";
  })
  
  /* BOOK MARKUP */
  
  function generateBookMarkup(book, bookKey) {
    return `
      <div class="book-item">
        <div class="book-detail">
          <span class="bold-span">Book:</span>
          <p>${book.name}</p>
        </div>
        <div class="book-detail">
          <span class="bold-span">Author:</span>
          <p>${book.author}</p>
        </div>
        <div class="book-detail">
          <span class="bold-span">Pages:</span>
          <p>${book.pages}</p>
        </div>
        <div class="book-detail">
          <span class="bold-span">Read:</span>
          <p>${book.read ? 'Yes' : 'No'}</p>
        </div>
        <button type="button" class="remove-btn" data-book-key="${bookKey}">X</button>
        <button type="button" class="toggle-read-btn" data-book-key="${bookKey}">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
      </div>
    `;
  }

  function toggleReadStatus(event) {
    const bookKey = event.target.dataset.bookKey;
    if (bookKey) {
      myLibrary[bookKey].read = !myLibrary[bookKey].read;
      publishLibrary();
    }
  }
  
  function removeBook(event) {
    const bookKey = event.target.dataset.bookKey;
    if (bookKey) {
      delete myLibrary[bookKey];
      publishLibrary();
    }
  }
  
  /* PUBLISH LIBRARY */
  
  function publishLibrary() {
    const bookContainer = document.querySelector('.book-content');
    bookContainer.innerHTML = '';
  
    for (let bookKey in myLibrary) {
      if (myLibrary.hasOwnProperty(bookKey)) {
        const book = myLibrary[bookKey];
        const bookMarkup = generateBookMarkup(book, bookKey);
        bookContainer.innerHTML += bookMarkup;
      }
    }
  
   // Add event listeners to remove buttons
   const removeButtons = document.querySelectorAll('.remove-btn');
   removeButtons.forEach((button) => {
     button.addEventListener('click', removeBook);
   });
 
   // Add event listeners to toggle-read buttons
   const toggleReadButtons = document.querySelectorAll('.toggle-read-btn');
   toggleReadButtons.forEach((button) => {
     button.addEventListener('click', toggleReadStatus);
   });
 }
  
  /* --------------*/
  
  const formEl = document.querySelector('#myForm');
  
  let myLibrary = {
    'Harry Potter and the Sorcerer\'s Stone': {
      name: 'Harry Potter and the Sorcerer\'s Stone',
      author: 'J.K. Rowling',
      pages: 336,
      read: true
    },
    'Harry Potter and the Chamber of Secrets': {
      name: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
      pages: 384,
      read: true
    },
    'Harry Potter and the Prisoner of Azkaban': {
      name: 'Harry Potter and the Prisoner of Azkaban',
      author: 'J.K. Rowling',
      pages: 448,
      read: true
    },
    'Harry Potter and the Goblet of Fire': {
      name: 'Harry Potter and the Goblet of Fire',
      author: 'J.K. Rowling',
      pages: 734,
      read: false
    },
    'Harry Potter and the Order of the Phoenix': {
      name: 'Harry Potter and the Order of the Phoenix',
      author: 'J.K. Rowling',
      pages: 870,
      read: false
    }
  };
  
  function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  
  function addBookToLibrary() {
    formEl.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Get Input Values
      const nameInput = document.querySelector('#name').value;
      const authorInput = document.querySelector('#author').value;
      const pagesInput = document.querySelector('#pages').value;
      const readInput = document.querySelector('#read').value;
  
      // Create Book Object
      const newBook = new Book(nameInput, authorInput, pagesInput, readInput);
  
      // Add Book to myLibrary
      myLibrary[newBook.name] = newBook;
  
      console.log(myLibrary);
  
      // Update book display
      publishLibrary();
    });
  }
  
  addBookToLibrary();
  
  document.addEventListener('DOMContentLoaded', publishLibrary);
  