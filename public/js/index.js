import { books } from "../utils/books.js";
import { calculators } from "../utils/calculators.js";

// NAVBAR--------------------------------------------------------------
const togggleButton = document.querySelector(".toggle-btn");
const links = document.querySelector(".nav-links");

togggleButton.addEventListener("click", () => {
  links.classList.toggle("show-nav-links");
});

// active link
// const activePage = window.location.pathname;

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }

  link.addEventListener("click", (e) => {
    e.preventDefault();

    navLinks.forEach((l) => {
      l.classList.remove("active");
    });

    link.classList.add("active");

    // Navigate to the new page after adding the active class
    window.location.href = link.href;
  });
});

// END OF NAVBAR--------------------------------------------------------

// DOWNLOAD PAGE
const gridBooks = document.querySelector(".grid-books");
const btnContainer = document.querySelector(".btn-container");

// load items

function displayBooks(booksArray) {
  let singleBook = booksArray.map((book) => {
    return `
          <div class="grid-book">       
            <a href=${book.downloadurl}><img src="${book.image}" alt="" /></a>       
            <div>
              <h5>${book.title}</h5>
              <p class="author">by ${book.author}</p>
              <p>published on ${book.publish}</p>
            </div>
          </div>
        `;
  });
  singleBook = singleBook.join(" ");
  gridBooks.innerHTML = singleBook;
}

function displayCategoryBtns() {
  const categories = books.reduce(
    (values, book) => {
      if (!values.includes(book.category)) {
        values.push(book.category);
      }
      return values;
    },
    ["all"]
  );

  const categoryBtns = categories
    .map((category) => {
      return `
            <button class="btn-filter ${
              category === "all" && "active-btn"
            }" data-id=${category} >${category}</button>`;
    })
    .join(" ");
  btnContainer.innerHTML = categoryBtns;

  // select btn after added to DOM
  const filterBtns = document.querySelectorAll(".btn-filter");
  // console.log(filterBtns);

  // active button change backgroud color
  btnContainer.addEventListener("click", (e) => {
    // console.log(e.target.dataset.id);
    const id = e.target.dataset.id;

    if (id) {
      filterBtns.forEach((btn) => {
        btn.classList.remove("active-btn");
      });
      e.target.classList.add("active-btn");
    }
  });

  // filter items
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.currentTarget.dataset.id;
      const bookCategory = books.filter(function (book) {
        if (book.category === category) {
          return book;
        }
      });
      if (category === "all") {
        displayBooks(books);
      } else {
        displayBooks(bookCategory);
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", function () {
  displayBooks(books);
  displayCategoryBtns();
});
// END OF DOWNLOAD PAGE

// CALCULATOR PAGE
function displayCalculators() {
  const calculatorsContainer = document.querySelector(".grid-container");

  let singleCalculator = calculators
    .map(
      ({ link, imgurl, name }) => `
      <div class="grid-item">
        <article>
          <a href="${link}">
            <img src="${imgurl}" alt="" style="width: 100px"/>
          </a>
          <h5>${name}</h5>
        </article>
      </div>
    `
    )
    .join("");

  calculatorsContainer.innerHTML = singleCalculator;
}

window.addEventListener("DOMContentLoaded", () => {
  displayCalculators();
});
// END OF CALCULATOR PAGE

