let libBooks = [];
let bookIdCounter = 0;
function Book(title, author, pages, read) {
    this.id = bookIdCounter++;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
    };
}

const BookOne = new Book('The Whisper', 'Meir Barak', '312', 'read');

function addBookToLibrary(title, author, pages, read) {

    const book = new Book(title, author, pages, read);
    libBooks.push(book);
    displayBook(book)

    console.log(`Pushed a new book (ID ${book.id}): ` + libBooks);
}


// JavaScript
const openButton = document.getElementById('add-book');
const closeButton = document.getElementById('close-template');
const templatePopup = document.getElementById('template-popup');
const overlay = document.getElementById('overlay');

openButton.addEventListener('click', () => {
    templatePopup.classList.remove('hidden');
});

closeButton.addEventListener('click', () => {
    templatePopup.classList.add('hidden');
});

overlay.addEventListener('click', () => {
    templatePopup.classList.add('hidden');
});

const form = document.getElementById('details-form');


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;


    // Get the selected category
    const readSelect = document.getElementById('read').value;


    addBookToLibrary(title, author, pages, readSelect);


    templatePopup.classList.add('hidden');
    form.reset();
});

function displayBook(book) {
    const books = document.getElementsByClassName("display-books");
    const bookContainer = books[0];

    const bookCard = document.createElement("div");
    const leftCard = document.createElement("div");
    const rightCard = document.createElement("div");
    bookCard.classList.add("book-card");

    leftCard.classList.add("left-card");
    rightCard.classList.add("right-card");
    const rightCardTop = document.createElement("div");
    const rightCardBot = document.createElement("div");
    rightCardTop.classList.add("right-card-top");
    rightCardBot.classList.add("right-card-bot");
    const iconTrash = document.createElement("div");
    iconTrash.classList.add("right-card-icon");


    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const readSelect = document.createElement("p");
    if (book.read === "yes") {
        leftCard.style.backgroundColor = "green";
    } else {
        leftCard.style.backgroundColor = "red";
    }

    title.textContent = "Title:  " + book.title;
    author.textContent = "Author:  " + book.author;
    pages.textContent = "Pages:  " + book.pages;
    readSelect.textContent = "Read ?  ";


    rightCardTop.appendChild(title);
    rightCardTop.appendChild(author);
    rightCardTop.appendChild(pages);
    rightCardBot.appendChild(readSelect)
    addToggleSwitch(rightCardBot, book.read, leftCard);

    const deleteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    deleteIcon.setAttribute("width", "24");
    deleteIcon.setAttribute("height", "24");
    deleteIcon.setAttribute("viewBox", "0 0 24 24");
    deleteIcon.innerHTML = `
        <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"></path>
    `;
    deleteIcon.addEventListener("click", () => {
        deleteBook(book.id, bookCard);
    });

    deleteIcon.classList.add("top-right-icon");
    iconTrash.appendChild(deleteIcon);
    rightCard.appendChild(iconTrash)
    rightCard.appendChild(rightCardTop)
    rightCard.appendChild(rightCardBot)
    bookCard.appendChild(leftCard);
    bookCard.appendChild(rightCard);
    bookContainer.appendChild(bookCard);


}


function addToggleSwitch(rightCardBot, readSelect, leftCard) {


    const label = document.createElement('label');
    label.classList.add('toggle-switch');

    const input = document.createElement('input');
    input.type = 'checkbox';

    const span = document.createElement('span');
    span.classList.add('slider');

    if (readSelect === "yes") {
        span.style.backgroundColor = "green";
    } else {
        span.style.backgroundColor = "red";
    }
    input.addEventListener('change', function () {
        if (span.style.backgroundColor === "red") {
            span.style.backgroundColor = 'green';
            leftCard.style.backgroundColor = "green";
        }
        else if (span.style.backgroundColor === "green") {
            span.style.backgroundColor = 'red';
            leftCard.style.backgroundColor = "red";
        }
    });

    label.appendChild(input);
    label.appendChild(span);
    rightCardBot.appendChild(label);
}

function deleteBook(bookId, bookCardElement) {
    libBooks = libBooks.filter((book) => book.id !== bookId);

    bookCardElement.remove();
    console.log(`Book deleted: ${bookId}    Updated books array:`, libBooks);

}