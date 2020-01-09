// Async await (ES7 syntax) seems like syntactic sugar for making promises easier
// to work with/read adn avoid alot of indented .then's

// React hooks are functions that let us access lifecycle methods
// in functional components (without having to use class components)

// asyc/await 
// - ES7 Feature
// - sort of syntactic sugar for making promises easier to work with/read
// - makes async code read like synchronous code
// - takes return value of function and automatically resolves it
// as a promise
// - await pauses execution of the function

// asynch 
// - ensures that a function returns a promise
// https://javascript.info/async-await
// ex.
// async function f() { return 1 }
// f().then(alert);		// 1

// await 
// - works only inside async functions
// - makes javascript wait until that promise settles and returns its result
// - blocks/stops code execution in function until promise is resolved
// https://hackernoon.com/should-i-use-promises-or-async-await-126ab5c98789

// fetch() 
// - returns a promise

// promise 
// - JS object that has 3 possible states (fulfilled, rejected, pending)



// EXAMPLE1********************************************************************
function getPrice(symbol) {
  let url = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`;
  return () => fetch(url);
}

getTwoCurrencies().then(log);

// ASYNC AWAIT
async function getTwoCurrencies() {
  // only do below if the second getPrice fetch relies on data
  // from the first get price fetch
  const sym1 = getPrice('BTC');
  const sym2 = getPrice('ETH');
  const prices = await Promise.all([sym1, sym2])
  return prices;
}


// WITHOUT ASYNC AWAIT
function getTwoCurrencies() {
  let sym1;
  return getPrice('BTC')
    .then(v => {
      v = sym1;
      return getPrice('ETH')
    })
    .then(v => [v, sym1])
}




// EXAMPLE2********************************************************************
// Incorrect way to use async await
async function getBooksAndAuthor(authorId) {
  const books = await bookModel.fetchAll();
  const author = await authorModel.fetch(authorId);
  return {
    author,
    books: books.filter(book => book.authorId === authorId),
  };
}

// Correct way
async function getBooksAndAuthor(authorId) {
  const bookPromise = bookModel.fetchAll();
  const authorPromise = authorModel.fetch(authorId);
  const book = await bookPromise;
  const author = await authorPromise;
  return {
    author,
    books: books.filter(book => book.authorId === authorId),
  };
}

// Wrong way also
async function getAuthors(authorIds) {
  // WRONG, this will cause sequential calls
  // const authors = _.map(
  //   authorIds,
  //   id => await authorModel.fetch(id));// CORRECT
  const promises = _.map(authorIds, id => authorModel.fetch(id));
  const authors = await Promise.all(promises);
}
