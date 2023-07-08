function findAccountById(accounts, id) {
  const found = accounts.find((account) => account.id === id);
  return found;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((nameA, nameB) =>
    nameA.name.last < nameB.name.last ? -1 : 1);
    return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let id = '';
  for (let name in account) {
    const accountID = account.id;
    id = accountID;
  };
  let borrows = [];
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    for (let j = 0; j < book.borrows.length; j++)
      if (book.borrows[j].id === id) {
        borrows.push(book)
    }
  }
  return borrows.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  let borrowed = [];
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    for (let j = 0; j < book.borrows.length; j++) {
      const borrowedBook = book.borrows[j];
      if (borrowedBook.id === account.id && borrowedBook.returned === false) {
        borrowed = borrowed.concat(book);
      }  
    }
  }
  for (let k = 0; k < borrowed.length; k++) {
    const id = borrowed[k].authorId;
    const authorObj = authors.find((author) => author.id === id);
    borrowed[k].author = authorObj;
  }
  return borrowed;
}
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
