const uncompleted_read = "incompleteBookshelfList";
const completed_read = "completeBookshelfList";
const book_id = "itemId";

function Book() {
    const uncompletedBookRead = document.getElementById(uncompleted_read);
    const completedBookRead = document.getElementById(completed_read);
    const inputBook = document.getElementById("inputBookTitle").value;
    const inputAuthor = document.getElementById("inputBookAuthor").value;
    const inputYear = document.getElementById("inputBookYear").value;
    const checkBox = document.getElementById("inputBookIsComplete").checked;
    if(checkBox) {
        let newBook = createBook(inputBook,inputAuthor,inputYear,true);
        let bookObject = compose_object(inputBook,inputAuthor,inputYear,true); 
        completedBookRead.append(newBook);
        newBook[book_id] = bookObject.id;
        books.push(bookObject);
    } else {
        let newBook = createBook(inputBook,inputAuthor,inputYear,false);
        let bookObject = compose_object(inputBook,inputAuthor,inputYear,false);   
        uncompletedBookRead.append(newBook);
        newBook[book_id] = bookObject.id;
        books.push(bookObject);
    }

    update_storage();
    return Book;
}

function createBook(book, author, year, isCompleted) {

    const book_Title = document.createElement("h3");
    book_Title.innerText = book;

    const authorName = document.createElement("p");
    authorName.innerHTML = `Penulis: <span id="author"> ` + author + `</span>`;

    const publicationYear = document.createElement("p");
    publicationYear.innerHTML = `Tahun: <span id="year"> ` + year + `</span>`;

    const container = document.createElement("div");
    container.classList.add("action")
    container.append(book_Title, authorName, publicationYear);

    if(isCompleted){
        container.append(
            UncompleteButton(),
            deleteButton()
        );
    } else {
        container.append(
            CompleteButton(),
            deleteButton()
        );
    }
    const article = document.createElement("article");
    article.classList.add("book_item");
    article.append(container);
    
    return article;
}

function createButton(buttonTypeClass, buttonText, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function UncompleteButton() {
    return createButton("green", "Belum Selesai dibaca", function (event) {
        undoCompleted(event.target.parentElement.parentElement);
    });
}

function CompleteButton() {
    return createButton("green", "Selesai dibaca", function (event) {
        addCompleted(event.target.parentElement.parentElement);
    });
}

function deleteButton() {
    return createButton("red", "Hapus buku", function (event) {
        removeCompleted(event.target.parentElement.parentElement);
    });
}

function addCompleted(completed) {
    const bookTitle = completed.querySelector("h3").innerText;
    const authorName = completed.querySelector("#author").innerText;
    const publicationYear = completed.querySelector("#year").innerText;

    const newBook = createBook(bookTitle,authorName,publicationYear,true);
    
    const book = find_book(completed[book_id]);
    book.isCompleted = true;
    newBook[book_id] = book.id;

    const completedBookRead = document.getElementById(completed_read);
    completedBookRead.append(newBook);
    completed.remove();
    
    update_storage();
    alert(bookTitle + " telah selesai dibaca");
}

function undoCompleted(completed){
    const uncompletedBookRead = document.getElementById(uncompleted_read);
    const bookTitle = completed.querySelector("h3").innerText;
    const authorName = completed.querySelector("#author").innerText;
    const publicationYear = completed.querySelector("#year").innerText;

    const newBook = createBook(bookTitle,authorName,publicationYear,false);
    
    const book = find_book(completed[book_id]);
    book.isCompleted = false;
    newBook[book_id] = book.id;

    uncompletedBookRead.append(newBook);
    completed.remove();
    
    update_storage();
    alert(bookTitle + " belum selesai dibaca");
}

function removeCompleted(uncompleted) {
    const bookPosition = find_index_book(uncompleted[book_id]);
    const bookTitle = uncompleted.querySelector("h3").innerText;
    let agreement = confirm(bookTitle + " akan dihapus");
    if (agreement == true) {
        books.splice(bookPosition, 1);
        uncompleted.remove();
        update_storage();
    }
}