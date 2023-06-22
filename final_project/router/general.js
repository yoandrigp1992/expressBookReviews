const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }
  

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json(JSON.stringify({ books }, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.status(300).json(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const authorParam =  req.params.author;

  let keysAuthor = Object.keys(books);  
  let booksDetails = [];

  let filter = keysAuthor.filter((i) => books[i].author === authorParam)
  
  let i = 0;
while (i < filter.length) {
  booksDetails.push(books[filter[i]]);
  i++;
}
  
  
  return res.status(300).json(booksDetails);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const titleParam =  req.params.title;

  let keysTitle = Object.keys(books);  
  let titleDetails = [];

  let filter = keysTitle.filter((i) => books[i].title === titleParam)
  
  let i = 0;
while (i < filter.length) {
    titleDetails.push(books[filter[i]]);
  i++;
}


  return res.status(300).json(titleDetails);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  const isbn = req.params.isbn;
  return res.status(300).json(books[isbn].reviews);
});


// TASK 10 - Get the book list available in the shop using Promises
public_users.get('/books',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });


      get_books.then(() => console.log("Promise for Task 10 resolved"));

  });

  // Task 11 Get book details based on ISBN
public_users.get('/books/isbn/:isbn',function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    const get_book = new Promise((resolve, reject) => {
        resolve(res.send(books[isbn]));
      });
      

      get_book.then(() => console.log("Promise for Task 11 resolved"));

   });

// Task 12 Get book details based on author
public_users.get('/books/author/:author',function (req, res) {
    //Write your code here
    const authorParam =  req.params.author;

    const get_book = new Promise((resolve, reject) => {
        let keysAuthor = Object.keys(books);  
        let booksDetails = [];    
        let filter = keysAuthor.filter((i) => books[i].author === authorParam);
        let i = 0;
        while (i < filter.length) {
            booksDetails.push(books[filter[i]]);
            i++; }
        resolve(res.send(booksDetails));
      });  
      get_book.then(() => console.log("Promise for Task 12 resolved"));    
  });


  // Task 13 Get all books based on title
public_users.get('/books/title/:title',function (req, res) {
    //Write your code here
    const titleParam =  req.params.title;
    const get_book = new Promise((resolve, reject) => {
        let keysTitle = Object.keys(books);  
        let titleDetails = [];  
        let filter = keysTitle.filter((i) => books[i].title === titleParam)    
        let i = 0;
        while (i < filter.length) {
            titleDetails.push(books[filter[i]]);
            i++;
        }
        resolve(res.send(titleDetails));
    });  
    get_book.then(() => console.log("Promise for Task 13 resolved"));    
  });


module.exports.general = public_users;
