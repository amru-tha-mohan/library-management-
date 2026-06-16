const mongoose = require("mongoose");
const Book = require("./models/Book");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    image: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
    available: true
  },
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    category: "Fantasy",
    image: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
    available: true
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Finance",
    image: "https://covers.openlibrary.org/b/id/240726-L.jpg",
    available: true
  },
  {
  title: "Artificial Intelligence",
  author: "Stuart Russell",
  category: "AI & ML",
  image: "https://covers.openlibrary.org/b/id/240728-L.jpg",
  available: true
},
{
  title: "Hands-On Machine Learning",
  author: "Aurelien Geron",
  category: "AI & ML",
  image: "https://covers.openlibrary.org/b/id/9250571-L.jpg",
  available: true
},
{
  title: "Python Crash Course",
  author: "Eric Matthes",
  category: "Programming",
  image: "https://covers.openlibrary.org/b/id/10389354-L.jpg",
  available: true
},
{
  title: "Eloquent JavaScript",
  author: "Marijn Haverbeke",
  category: "Programming",
  image: "https://covers.openlibrary.org/b/id/8091016-L.jpg",
  available: true
},
{
  title: "The Lord of the Rings",
  author: "J.R.R Tolkien",
  category: "Fantasy",
  image: "https://covers.openlibrary.org/b/id/8231996-L.jpg",
  available: true
},
{
  title: "The Name of the Wind",
  author: "Patrick Rothfuss",
  category: "Fantasy",
  image: "https://covers.openlibrary.org/b/id/7268788-L.jpg",
  available: true
},
{
  title: "The Silent Patient",
  author: "Alex Michaelides",
  category: "Fiction",
  image: "https://covers.openlibrary.org/b/id/9254572-L.jpg",
  available: true
},
{
  title: "The Midnight Library",
  author: "Matt Haig",
  category: "Fiction",
  image: "https://covers.openlibrary.org/b/id/10523338-L.jpg",
  available: true
},
{
  title: "The Power of Now",
  author: "Eckhart Tolle",
  category: "Self Help",
  image: "https://covers.openlibrary.org/b/id/8221251-L.jpg",
  available: true
},
{
  title: "Can't Hurt Me",
  author: "David Goggins",
  category: "Self Help",
  image: "https://covers.openlibrary.org/b/id/9254551-L.jpg",
  available: true
},
{
  title: "The Intelligent Investor",
  author: "Benjamin Graham",
  category: "Finance",
  image: "https://covers.openlibrary.org/b/id/8234140-L.jpg",
  available: true
},
{
  title: "Think and Grow Rich",
  author: "Napoleon Hill",
  category: "Finance",
  image: "https://covers.openlibrary.org/b/id/8226191-L.jpg",
  available: true
},
{
  title: "Brief Answers to the Big Questions",
  author: "Stephen Hawking",
  category: "Science",
  image: "https://covers.openlibrary.org/b/id/9250534-L.jpg",
  available: true
},
{
  title: "The Gene",
  author: "Siddhartha Mukherjee",
  category: "Science",
  image: "https://covers.openlibrary.org/b/id/8232184-L.jpg",
  available: true
},
{
  title: "Leonardo da Vinci",
  author: "Walter Isaacson",
  category: "Biography",
  image: "https://covers.openlibrary.org/b/id/9254544-L.jpg",
  available: true
},
{
  title: "Elon Musk",
  author: "Walter Isaacson",
  category: "Biography",
  image: "https://covers.openlibrary.org/b/id/12895012-L.jpg",
  available: true
},
{
  title: "Homo Deus",
  author: "Yuval Noah Harari",
  category: "History",
  image: "https://covers.openlibrary.org/b/id/8235120-L.jpg",
  available: true
},
{
  title: "Guns, Germs and Steel",
  author: "Jared Diamond",
  category: "History",
  image: "https://covers.openlibrary.org/b/id/8235102-L.jpg",
  available: true
},
{
  title: "Zero to One",
  author: "Peter Thiel",
  category: "Business",
  image: "https://covers.openlibrary.org/b/id/8235200-L.jpg",
  available: true
},
{
  title: "The Lean Startup",
  author: "Eric Ries",
  category: "Business",
  image: "https://covers.openlibrary.org/b/id/8235201-L.jpg",
  available: true
},
  {
    title: "Deep Work",
    author: "Cal Newport",
    category: "Self Help",
    image: "https://covers.openlibrary.org/b/id/11153229-L.jpg",
    available: true
  },
  {
    title: "Clean Code",
    author: "Robert Martin",
    category: "Programming",
    image: "https://covers.openlibrary.org/b/id/9610926-L.jpg",
    available: true
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    category: "Programming",
    image: "https://covers.openlibrary.org/b/id/8097440-L.jpg",
    available: true
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas Cormen",
    category: "Programming",
    image: "https://covers.openlibrary.org/b/id/13518286-L.jpg",
    available: true
  },
  {
    title: "The Hobbit",
    author: "J.R.R Tolkien",
    category: "Fantasy",
    image: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
    available: true
  },
  {
    title: "Game of Thrones",
    author: "George R.R Martin",
    category: "Fantasy",
    image: "https://covers.openlibrary.org/b/id/8319251-L.jpg",
    available: true
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    available: true
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    image: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
    available: true
  },
  {
    title: "Think Like a Monk",
    author: "Jay Shetty",
    category: "Self Help",
    image: "https://covers.openlibrary.org/b/id/10594765-L.jpg",
    available: true
  },
  {
    title: "Wings of Fire",
    author: "A.P.J Abdul Kalam",
    category: "Biography",
    image: "https://covers.openlibrary.org/b/id/10418429-L.jpg",
    available: true
  },
  {
    title: "Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    image: "https://covers.openlibrary.org/b/id/12889354-L.jpg",
    available: true
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    image: "https://covers.openlibrary.org/b/id/8235116-L.jpg",
    available: true
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    category: "Biography",
    image: "https://covers.openlibrary.org/b/id/9251996-L.jpg",
    available: true
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    image: "https://covers.openlibrary.org/b/id/7262161-L.jpg",
    available: true
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    image: "https://covers.openlibrary.org/b/id/240726-L.jpg",
    available: true
  },
  {
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    category: "Science",
    image: "https://covers.openlibrary.org/b/id/5546156-L.jpg",
    available: true
  },
  {
    title: "Cosmos",
    author: "Carl Sagan",
    category: "Science",
    image: "https://covers.openlibrary.org/b/id/240727-L.jpg",
    available: true
  }
];

const seedBooks = async () => {
  try {
    await Book.deleteMany();
    await Book.insertMany(books);

    console.log("✅ 20 Books Inserted Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedBooks();