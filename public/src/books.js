function findAuthorById(authors, id) {
  const found = authors.find((author) => author.id === id);
  return found;
}

function findBookById(books, id) {
  const bookFind = books.find((book) => book.id === id);
  return bookFind;
}

function partitionBooksByBorrowedStatus(books) {
  let notReturned = [];
  let returned = [];
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const bookNotReturned = book.borrows.some((book) => book.returned === false);
    if (bookNotReturned === true) {
      notReturned = notReturned.concat(book);
    } else {
      returned = returned.concat(book);
    }
  }
  const results = [notReturned, returned];
  return results;
}


function getBorrowersForBook(book, accounts) {
  let borrowers = [];
  for (let i = 0; i < book.borrows.length && i < 10; i++) {
    const borrower = book.borrows[i].id;
    const accountOfBorrower = accounts.find((bor) => bor.id === borrower);
    accountOfBorrower.returned = book.borrows[i].returned;
    borrowers = borrowers.concat(accountOfBorrower)
  };
  return borrowers
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
