const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

function storage_exist() {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function save_data() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY,parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function load_storage() {
    const serialData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serialData);

    if(data !== null)
        books = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function update_storage() {
    if(storage_exist())
        save_data();
}

function compose_object(book, author, year, isCompleted) {
    return {
        id: +new Date(), book, author, year, isCompleted
    };
}

function find_book(bookId) {
    for(book of books){
        if(book.id === bookId)
            return book;
    }
    return null;
}

function find_index_book(bookId) {
    let index = 0
    for (book of books) {
        if(book.id === bookId)
            return index;
        index++;
    }
    return -1;
}

function refresh() {
    const listUncompleted = document.getElementById(uncompleted_read);
    let listCompleted = document.getElementById(completed_read);

    for(book of books){
        const newBook = createBook(book.book,book.author,book.year, book.isCompleted);
        newBook[book_id] = book.id;
        if(book.isCompleted){
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}