import { LightningElement, api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import getBooksByGenre from '@salesforce/apex/HomePageController.getBooksByGenre';
import icons from '@salesforce/resourceUrl/otherImages';

export default class BooksContainer extends LightningElement {
    @api bookscomponent;
    @api loggedinuser;
    @api bookslist;
    @api bookcontainertype;

    previous = icons + '/otherImages/Left.png';
    next = icons + '/otherImages/Right.png';

    firstSlice = 0;
    lastSlice = 5;

    recommendedBooks = false;
    newBooks = false;
    authorBooks = false;

    books;
    filteredBooksList;
    activeGenre = 'wszystkie';

    renderPreviousBook(){
        if(this.firstSlice>0){
            this.firstSlice -= 1;
            this.lastSlice -= 1;
            if(this.activeGenre === 'wszystkie'){
                this.books = this.bookslist.slice(this.firstSlice, this.lastSlice);
            }
            else{
                this.books = this.filteredBooksList.slice(this.firstSlice, this.lastSlice);
            }
        }
    }
    renderNextBook(){
        if(this.lastSlice<this.bookslist.length){
            this.firstSlice += 1;
            this.lastSlice += 1;
            if(this.activeGenre === 'wszystkie'){
                this.books = this.bookslist.slice(this.firstSlice, this.lastSlice);
            }
            else{
                this.books = this.filteredBooksList.slice(this.firstSlice, this.lastSlice);
            }
        }
    }

    goToDetailsAction(){
        localStorage.setItem('bookid', this.book.Id);

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Szczegoly__c'
            }
        });
    }

    connectedCallback(){
        if(this.bookscomponent === 'recommended'){
            this.recommendedBooks = true;
        }
        else if(this.bookscomponent === 'new'){
            this.newBooks = true;
        }
        else if(this.bookscomponent === 'author'){
            this.authorBooks = true;
        }
        this.books = this.bookslist.slice(this.firstSlice, this.lastSlice);
    }

    changeGenre(event){
        let clickedString = event.target.id.split('-')[0];
        let clicked = this.template.querySelector(`a[id^="${clickedString}"]`);
        let previousActive = this.template.querySelector(`a[class*="active"]`);

        previousActive.classList.remove('active');
        clicked.classList.add('active');

        this.activeGenre = clickedString;
        this.firstSlice = 0;
        this.lastSlice = 5;

        if(this.activeGenre === 'wszystkie'){
            this.books = this.bookslist.slice(this.firstSlice, this.lastSlice);
        }
        else{
            getBooksByGenre({
                genre: this.activeGenre
            }).then( books => {
                this.filteredBooksList = books;
                this.books = this.filteredBooksList.slice(this.firstSlice, this.lastSlice);
            })
        }
    }
}