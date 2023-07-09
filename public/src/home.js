function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let notReturned = [];
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const bookNotReturned = book.borrows.filter((borrow) => borrow.returned === false);
    notReturned = notReturned.concat(bookNotReturned)
  }
  return notReturned.length;
}

function topFive(array) {
  return array.slice(0, 5)
}

function addToPopBooks(popBooks, book) {
  const bookEntry = {};
  bookEntry.name = book.title;
  bookEntry.count = book.count;
  popBooks.push(bookEntry);
  return popBooks;
}

function getMostCommonGenres(books) {
  books.sort((bookA, bookB) => bookA.genre < bookB.genre ? -1 : 1);
  let popGenres = [];
  let genreName = '';
  let tally = 1;
  for (let i = 1; i < books.length; i++) {
    const book = books[i];
    genreName = books[i - 1].genre;
    if (book.genre === books[i - 1].genre) {
      tally  += 1;
    } else {
      const genreEntry = {};
      genreEntry.name = genreName;
      genreEntry.count = tally;
      popGenres = popGenres.concat(genreEntry);
      genreName = '';
      tally = 1;
    }
  }
  popGenres.sort((bookA, bookB) => bookA.count > bookB.count ? -1 : 1);
  const results = topFive(popGenres);
  return results;
}

function getMostPopularBooks(books) {
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    book.count = book.borrows.length;
  }
  books.sort((bookA, bookB) => bookA.count > bookB.count ? -1 : 1)
  let popBooks = [];
  for (let j = 0; j < books.length; j++) {
    popBooks = addToPopBooks(popBooks, books[j])
  }
  const results = topFive(popBooks);
  return results;
}


function getMostPopularAuthors(books, authors) {
  for (let i = 0; i < authors.length; i++) {
    const author = authors[i];
    const id = author.id;
    let tally = 0;
    for (let j = 0; j < books.length; j++) {
      if (books[j].authorId === id) {
        const borrowCount = books[j].borrows.length;
        tally += borrowCount;
      }
    }
    author.count = tally;
  }
  authors.sort((authorA, authorB) => authorA.count > authorB.count ? -1 : 1);
  let popAuthors = authors.map((author) => {
    const authorEntry = {};
    authorEntry.name = `${author.name.first} ${author.name.last}`;
    authorEntry.count = author.count;
    return authorEntry;
  });
  const results = topFive(popAuthors);
  return results;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
