import { LightningElement } from 'lwc';
import bookImages from '@salesforce/resourceUrl/bookImages';

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


export default class BooksListPage extends LightningElement {
    firstSlice = 0;
    lastSlice = 5;
    books = books.slice(this.firstSlice, this.lastSlice);

    filteredBooks = [];
    genreValue;
    filtersOn = false;
    genres = [
        { label: 'Wybierz gatunek', value: 'None' },
        { label: 'Fantastyka', value: 'Fantastyka' },
        { label: 'Horror', value: 'Horror' },
        { label: 'Kryminał', value: 'Kryminał' },
    ];

    changeNumberOfResults(event){
        let clickedString = event.target.id.split('-')[0];
        let clicked = this.template.querySelector(`span[id^="${clickedString}"]`);
        let previousActive = this.template.querySelector(`span[class*="active"]`);

        previousActive.classList.remove('active');
        clicked.classList.add('active');

        /*switch(clickedString){
            case 'five':
                this.firstSlice = 0;
                this.lastSlice = 5;
                break;
            case 'ten':
                this.firstSlice = 0;
                this.lastSlice = 10;
                break;
            case 'fifteen':
                this.firstSlice = 0;
                this.lastSlice = 15;
                break;
        }*/

        //this.books = books.slice(this.firstSlice, this.lastSlice);
    }

    changeResults(event){
        let clickedString = event.target.id.split('-')[0];

        switch(clickedString){
            case 'previous':
                if(this.firstSlice>4){
                    this.firstSlice -= 5;
                    this.lastSlice -= 5;
                    if(this.filtersOn){
                        this.books = this.filteredBooks.slice(this.firstSlice, this.lastSlice);
                    }
                    else{
                        this.books = books.slice(this.firstSlice, this.lastSlice); 
                    }
                    window.scrollTo({top: 0});
                }
                break;
            case 'next':
                if(this.filtersOn){
                    if(this.lastSlice<this.filteredBooks.length){
                        this.firstSlice += 5;
                        this.lastSlice += 5;
                        this.books = this.filteredBooks.slice(this.firstSlice, this.lastSlice);
                        window.scrollTo({top: 0});
                    }
                }
                else{
                    if(this.lastSlice<books.length){
                        this.firstSlice += 5;
                        this.lastSlice += 5;
                        this.books = books.slice(this.firstSlice, this.lastSlice); 
                        window.scrollTo({top: 0});
                    }
                }
                break;
        }

    }

    filterGenre(event){
        this.genreValue = event.target.value;
        this.firstSlice = 0;
        this.lastSlice = 5;
        if(this.genreValue==='None'){
            this.filtersOn = false;
            this.books = books.slice(this.firstSlice, this.lastSlice);
        }
        else{
            this.filtersOn = true;
            this.filteredBooks = books.filter(n => {
                return n.genre===this.genreValue;
            });  
            this.books = this.filteredBooks.slice(this.firstSlice, this.lastSlice);
        }
    }

    renderedCallback(){
        let nextButton = this.template.querySelector(`button[id^="next"]`);
        let previousButton = this.template.querySelector(`button[id^="previous"]`);
        if((this.filtersOn && this.lastSlice>this.filteredBooks.length) || (this.filtersOn==false && this.lastSlice>books.length)){
            nextButton.disabled = true;
        }
        else{
            nextButton.disabled = false;
        }

        if(this.firstSlice<4){
            previousButton.disabled = true;
        }
        else{
            previousButton.disabled = false;
        }
    }
}