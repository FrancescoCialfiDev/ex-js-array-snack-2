"use strict"

const books = [
    {
        title: "React Billionaire",
        pages: 250,
        author: {
            name: 'Alice',
            age: 35
        },
        available: false,
        price: '101€',
        tags: ['advanced', 'js', 'react', 'senior']
    },
    {
        title: "Advanced JS",
        pages: 500,
        author: {
            name: 'Bob',
            age: 20
        },
        available: true,
        price: '25€',
        tags: ['advanced', 'js', 'mid-senior']
    },
    {
        title: "CSS Secrets",
        pages: 320,
        author: {
            name: 'Alice',
            age: 17,
        },
        available: true,
        price: '8€',
        tags: ['html', 'css', 'junior']
    },
    {
        title: "HTML Mastery",
        pages: 200,
        author: {
            name: 'Charlie',
            age: 50
        },
        available: false,
        price: '48€',
        tags: ['html', 'advanced', 'junior', 'mid-senior']
    },
];

// SNACK 1 //-----------------------------------------------------------------

// Crea una funzione che somma due numeri
function somma(a, b) {
    return a + b;
}

// Crea un array (longBooks) con i libri che hanno piu di 300 pagine
const longBooks = books.filter(book => book.pages > 300);
console.log(longBooks);

// Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
const bookTitles = longBooks.map(bookTitle => bookTitle.title);
console.log(bookTitles);

// Stampa in console ogni titolo
bookTitles.forEach((element) => console.log(element));

//----------------------------------------------------------------------------

// SNACK 2 //-----------------------------------------------------------------

// Creare un array (availableBooks) che contiene tutti i libri disponibili.
const availableBooks = books.filter((book) => book.available === true)
console.log(availableBooks)

// Crea un array (discountedBooks) con gli availableBooks, ciascuno con il prezzo scontato del 20% (mantieni lo stesso formato e arrotonda al centesimo)
const discountedBooks = structuredClone(availableBooks)
discountedBooks.forEach((book) => book.price = (parseInt(book.price) - ((parseInt(book.price) / 100) * 20)).toFixed(2) + "$");
console.log(discountedBooks);

// Salva in una variabile (fullPricedBook) il primo elemento di discountedBooks che ha un prezzo intero (senza centesimi).
//const fullPricedBook = discountedBooks.find((book))
const fullPricedBook = discountedBooks.find((element) => Number.isInteger(parseInt(element.price)))
console.log(fullPricedBook)

//----------------------------------------------------------------------------


// SNACK 3 //-----------------------------------------------------------------

// Creare un array (authors) che contiene gli autori dei libri.
const authors = books.map((autor) => autor.author)
console.log(authors)

// Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
const areAuthorsAdults = authors.every((autor) => autor.age >= 18)
console.log(areAuthorsAdults)

// Ordina l’array authors in base all’età, senza creare un nuovo array.
// (se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)
authors.sort((a, b) => {
    if (areAuthorsAdults === true) {
        return a.age - b.age
    } else {
        return b.age - a.age
    }

})
console.log(authors)

//----------------------------------------------------------------------------

// SNACK 4 //-----------------------------------------------------------------

// Creare un array (ages) che contiene le età degli autori dei libri.
const ages = books.map((book) => { return book.author.age })
console.log(ages)

// Calcola la somma delle età (agesSum) usando reduce. 
const somma2 = ages.reduce((acc, curr) => {
    const somma = acc + curr
    return somma
}, 0)
console.log(somma2)

// Stampa in console l’età media degli autori dei libri.
console.log(somma2 / authors.length)

//----------------------------------------------------------------------------

// SNACK 5 / ( BONUS ) //-----------------------------------------------------
// Usando la l'API https://boolean-spec-frontend.vercel.app/freetestapi/books/{id} usa la combinazione di .map() e Promise.all(), per creare una funzione (getBooks) che a partire da un array di id (ids), ritorna una promise che risolve un array di libri (books).
//Testala con l’array [2, 13, 7, 21, 19] .
const ids = [2, 13, 7, 21, 19];

async function fetchData(url) {
    const fetchData = await fetch(url)
    const obj = await fetchData.json()
    return obj
}

async function getBooks() {
    try {
        return Promise.all(ids.map((id) => {
            return fetchData(`https://boolean-spec-frontend.vercel.app/freetestapi/books/${id}`);
        }));
    } catch (error) {
        throw new Error("Errore nella fetch")
    }

}
(async () => {
    try {
        const data = await getBooks()
        console.log(data)
    } catch (error) {
        console.error(error)
    }
})()



//----------------------------------------------------------------------------

// SNACK 6 / ( BONUS ) //-----------------------------------------------------

// Crea una variabile booleana (areThereAvailableBooks) per verificare se c’è almeno un libro disponibile.
const areThereAvailableBooks = books.some((books) => books.available === false)
console.log(areThereAvailableBooks)

// Crea un array (booksByPrice) con gli elementi di books ordinati in base al prezzo (crescente).
const booksByPrice = books.sort((a, b) => {
    return parseInt(a.price) - parseInt(b.price)
})
console.log(booksByPrice)

// Ordina l’array booksByPricein base alla disponibilità (prima quelli disponibili), senza creare un nuovo array.

const booksByPricein = books.sort((a, b) => {
    return String(b.available).localeCompare(String(a.available))
})
console.log(booksByPricein)

//----------------------------------------------------------------------------

// SNACK 7 / ( BONUS ) //-----------------------------------------------------

// Usa reduce per creare un oggetto (tagCounts) che conta quante volte ogni tag viene usato tra i libri.

const tagCounts = books.reduce((accumulatore, book) => {
    book.tags.forEach((tag) => {
        if (accumulatore[tag]) {
            accumulatore[tag]++
        } else {
            accumulatore[tag] = 1
        }
    })
    return accumulatore
}, {});
console.log(tagCounts);

//----------------------------------------------------------------------------


