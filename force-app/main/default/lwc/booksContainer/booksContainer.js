import { LightningElement, api} from 'lwc';

import bookImages from '@salesforce/resourceUrl/bookImages';
import icons from '@salesforce/resourceUrl/otherImages';

const books = [
    {   
        id: 0,
        title: 'Opowieści z Narnii',
        author: 'C.S.Lewis',
        src: bookImages + '/bookImages/opowiesciZNarniiLewCzarownicaIStaraSzafa.jpg'
    },
    {
        id: 1,
        title: 'Ostatnie życzenie',
        author: 'Andrzej Sapkowski',
        src: bookImages + '/bookImages/wiedzminOstatnieZyczenie.jpg'
    },
    {
        id: 2,
        title: 'Gra o tron',
        author: 'George R.R.Martin',
        src: bookImages + '/bookImages/graOTron.jpg'
    },
    {
        id: 3,
        title: "Pies Baskerville'ów",
        author: 'Arthur Conan Doyle',
        src: bookImages + '/bookImages/piesBaskervilleow.jpg'
    },
    {
        id: 4,
        title: 'TO',
        author: 'Stephen King',
        src: bookImages + '/bookImages/TO.jpg'
    },
    {
        id: 5,
        title: 'TO',
        author: 'Stephen King',
        src: bookImages + '/bookImages/TO.jpg'
    }
]

export default class BooksContainer extends LightningElement {
    @api bookscomponent;
    @api loggedinuser;

    previous = icons + '/otherImages/Left.png';
    next = icons + '/otherImages/Right.png';

    firstSlice = 0;
    lastSlice = 5;

    recommendedBooks = false;
    newBooks = false;
    authorBooks = false;

    books = books.slice(this.firstSlice, this.lastSlice);

    renderPreviousBook(){
        if(this.firstSlice>0){
            this.firstSlice -= 1;
            this.lastSlice -= 1;
            this.books = books.slice(this.firstSlice, this.lastSlice);
        }
    }
    renderNextBook(){
        if(this.lastSlice<books.length){
            this.firstSlice += 1;
            this.lastSlice += 1;
            this.books = books.slice(this.firstSlice, this.lastSlice);
        }
    }

    connectedCallback(){
        if(this.bookscomponent === 'recommended'){
            this.recommendedBooks = true;
        }
        else if(this.bookscomponent === 'new'){
            this.newBooks = true;
        }
        else{
            this.authorBooks = true;
        }
    }

    changeGenre(event){
        let clickedString = event.target.id.split('-')[0];
        let clicked = this.template.querySelector(`a[id^="${clickedString}"]`);
        let previousActive = this.template.querySelector(`a[class*="active"]`);

        previousActive.classList.remove('active');
        clicked.classList.add('active');
    }
}