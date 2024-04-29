// Задание 1

console.log('--------------------------------------------');
console.log('Задание 1');
class Library {
    #books = [];
    constructor(books) {
        Library.validateBookList(books);
        this.#books = books;
    }
    static validateBookList(books) {
        const booksSet = new Set();
        books.forEach(el => {
            booksSet.add(el);
        });
        if (booksSet.size !== books.length) {
            throw new Error('Представленный массив содержит дубликаты!');
        }
    }
    static bookExistValidation(bookList, book) {
        if(bookList.indexOf(book) !== -1) {
            throw new Error('Такая книга есть в списке!');
        }
    }
    static bookNotExistValidation(bookList, book) {
        if(bookList.indexOf(book) === -1) {
            throw new Error('Такой книги нет в списке!');
        }
    }
    get allBooks() {
        return this.#books;
    }
    addBook(title) {
        Library.bookExistValidation(this.#books, title);
        this.#books.push(title);
    }
    removeBook(title) {
        Library.bookNotExistValidation(this.#books, title);
        this.#books = this.#books.filter(el => el !== title);
    }
    hasBook(title) {
        return this.#books.indexOf(title) !== -1 ? true : false;
    }
}

const books1 = ['Книга 1', 'Книга 1', 'Книга 1', 'Книга 1', 'Книга 1'];
const books2 = ['Книга 1', 'Книга 2', 'Книга 3', 'Книга 4', 'Книга 5'];

const library2 = new Library(books2);
// const library1 = new Library(books1);

library2.addBook('Книга 0');
// library2.addBook('Книга 1');
console.log(library2.allBooks);


library2.removeBook('Книга 0');
console.log(library2.allBooks);
// library2.removeBook('Книга 0');
// console.log(library2.allBooks);

console.log(library2.hasBook('Книга 0'));
console.log(library2.hasBook('Книга 1'));
console.log(library2.hasBook('Книга 2'));
console.log(library2.hasBook('Книга 3'));
console.log(library2.hasBook('Книга 4'));
console.log(library2.hasBook('Книга 5'));
console.log(library2.hasBook('Книга 6'));







// Задание 2
console.log('');
console.log('--------------------------------------------');
console.log('Задание 2');
const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: 1,
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: 2,
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: 3,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: 4,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

function findMaxReviewID(data) {
  let temporary = Number.MIN_SAFE_INTEGER;
  for (const item of data) {
    for (const review of item.reviews) {
      if (review.id > temporary) {
        temporary = review.id
      }
    }
  }
  return temporary;
}

class Review {
  static id = findMaxReviewID(initialData);

  constructor(text) {
    this.text = text;
    this.id = ++Review.id;
  }

  get reviewID() {
    return this.id;
  }

  get reviewText() {
    return this.text;
  }
}

function createProductCard(cardData) {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card');

  cardEl.innerHTML = `<div class="card">
  <h3 class="card__title">${cardData.product}</h3>
  <ul class="card__review-list">
    ${ getLiItems(cardData.reviews) }
  </ul>
  <form action="#" class="card__review-form">
    <input type="text" class="card__review-input" placeholder="Напишите свой отзыв...">
    <button class="card__review-button">Оставить отзыв</button>
  </form>
  <div class="card__review-error"></div>
</div> 
  `
  return cardEl;
}

function getLiItems(liItems) {
  if (liItems.length !== 0) {
    let tempString = '';
    for (const liItem of liItems) {
      tempString += `<li class="card__review-item" data-id="${liItem.id}">${liItem.text}</li>`
    }
    return tempString;
  }
}

function validateInputText(text) {
  try {
    if (text.length > 500 || text.length < 50) {
      throw new Error('Отзыв должен быть не менее 50 символов в длину и не более 500!');
    }
    return '';
  } catch (error) {
    return error.message;
  }
}


function addLiItem(val, ulElement) {
  const reviewItem = new Review(val);
  const liEl = document.createElement('li')
  const liTemplate = `<li class="card__review-item" data-id="${reviewItem.reviewID}">${reviewItem.reviewText}</li>`
  liEl.innerHTML = liTemplate;
  console.log(reviewItem.reviewID);
  ulElement.appendChild(liEl);
}


const products = document.querySelector('#products');

for (const product of initialData) {
  products.appendChild(createProductCard(product));
}
products.addEventListener('click', event => {
  event.preventDefault();
  const buttonEl = event.target;
  if (buttonEl.classList.contains('card__review-button')) {
    const cardEl = buttonEl.closest('.card');
    const errorEl = cardEl.querySelector('.card__review-error');
    const inputEl = cardEl.querySelector('.card__review-input');
    const ulEl = cardEl.querySelector('.card__review-list');
    const value = inputEl.value;
    const validationResult = validateInputText(value);
    if(validationResult === '') {
      errorEl.textContent = '';
      addLiItem(value, ulEl);
      inputEl.value = ''; 
    } else {
      errorEl.textContent = validationResult; 
    }
  }
})




