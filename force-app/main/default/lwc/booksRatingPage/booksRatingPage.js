import { LightningElement, wire } from 'lwc';
import bookImages from '@salesforce/resourceUrl/bookImages';
import getAllBooksToRanking from '@salesforce/apex/BookController.getAllBooksToRanking';

const books = [
    {   
        id: 0,
        title: 'Opowieści z Narnii',
        author: 'C.S.Lewis',
        series: '',
        genre: 'Fantastyka',
        average: 8.5,
        src: bookImages + '/bookImages/opowiesciZNarniiLewCzarownicaIStaraSzafa.jpg'
    },
    {
        id: 1,
        title: 'Ostatnie życzenie',
        author: 'Andrzej Sapkowski',
        series: 'Wiedźmin',
        genre: 'Fantastyka',
        average: 9.00,
        src: bookImages + '/bookImages/wiedzminOstatnieZyczenie.jpg'
    },
    {
        id: 2,
        title: 'Gra o tron',
        author: 'George R.R.Martin',
        series: '',
        genre: 'Fantastyka',
        average: 9.5,
        src: bookImages + '/bookImages/graOTron.jpg'
    },
    {
        id: 3,
        title: "Pies Baskerville'ów",
        author: 'Arthur Conan Doyle',
        series: '',
        genre: 'Kryminał',
        average: 7.00,
        src: bookImages + '/bookImages/piesBaskervilleow.jpg'
    },
    {
        id: 4,
        title: 'TO',
        author: 'Stephen King',
        series: '',
        genre: 'Horror',
        average: 7.50,
        src: bookImages + '/bookImages/TO.jpg'
    },
    {
        id: 5,
        title: 'TO',
        author: 'Stephen King',
        series: '',
        genre: 'Horror',
        average: 7.50,
        src: bookImages + '/bookImages/TO.jpg'
    },
    {
        id: 6,
        title: 'TO',
        author: 'Stephen King',
        series: '',
        genre: 'Horror',
        average: 7.50,
        src: bookImages + '/bookImages/TO.jpg'
    },
    {
        id: 7,
        title: 'Gra o tron',
        author: 'George R.R.Martin',
        series: '',
        genre: 'Fantastyka',
        average: 9.5,
        src: bookImages + '/bookImages/graOTron.jpg'
    },
    {
        id: 8,
        title: 'Ostatnie życzenie',
        author: 'Andrzej Sapkowski',
        series: 'Wiedźmin',
        genre: 'Fantastyka',
        average: 9.00,
        src: bookImages + '/bookImages/wiedzminOstatnieZyczenie.jpg'
    },
    {
        id: 9,
        title: 'Ostatnie życzenie',
        author: 'Andrzej Sapkowski',
        series: 'Wiedźmin',
        genre: 'Fantastyka',
        average: 9.00,
        src: bookImages + '/bookImages/wiedzminOstatnieZyczenie.jpg'
    },
    {
        id: 10,
        title: 'Ostatnie życzenie',
        author: 'Andrzej Sapkowski',
        series: 'Wiedźmin',
        genre: 'Fantastyka',
        average: 9.00,
        src: bookImages + '/bookImages/wiedzminOstatnieZyczenie.jpg'
    },
    {
        id: 11,
        title: 'Ostatnie życzenie',
        author: 'Andrzej Sapkowski',
        series: 'Wiedźmin',
        genre: 'Fantastyka',
        average: 9.00,
        src: bookImages + '/bookImages/wiedzminOstatnieZyczenie.jpg'
    },
]

export default class BooksRatingPage extends LightningElement {
    firstSlice = 0;
    lastSlice = 5;
    allBooks;
    books;

    @wire(getAllBooksToRanking)
    wiredBooks({ error, data }) {
        if (data) {
            this.allBooks = data;
            this.books = this.allBooks.slice(this.firstSlice, this.lastSlice);
            this.error = undefined;
        } else if (error) {
            this.error = error;
        }
    }

    changeResults(event){
        let clickedString = event.target.id.split('-')[0];

        switch(clickedString){
            case 'previous':
                if(this.firstSlice>4){
                    this.firstSlice -= 5;
                    this.lastSlice -= 5;
                    this.books = this.allBooks.slice(this.firstSlice,this.lastSlice);
                    window.scrollTo({top: 0});
                }
                break;
            case 'next':
                if(this.lastSlice<this.allBooks.length){
                    this.firstSlice += 5;
                    this.lastSlice += 5;
                    this.books = this.allBooks.slice(this.firstSlice,this.lastSlice);
                    window.scrollTo({top: 0});
                }
                break;
        }

    }

    renderedCallback(){
        let nextButton = this.template.querySelector(`button[id^="next"]`);
        let previousButton = this.template.querySelector(`button[id^="previous"]`);
        if(this.allBooks!=undefined){
            if(this.lastSlice>=this.allBooks.length){
                nextButton.disabled = true;
            }
            else{
                nextButton.disabled = false;
            }
        }
        if(this.firstSlice<4){
            previousButton.disabled = true;
        }
        else{
            previousButton.disabled = false;
        }
    }
}