import { LightningElement, wire, track } from 'lwc';
import bookImages from '@salesforce/resourceUrl/bookImages';

import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import getAllBooks from '@salesforce/apex/BookController.getAllBooks';
import getAllBooksByGenre from '@salesforce/apex/BookController.getAllBooksByGenre';

import BookObject from "@salesforce/schema/Book__c";
import BookGenres from "@salesforce/schema/Book__c.Genre__c";

export default class BooksListPage extends LightningElement {

    allBooks;
    books;
    numberOfDisplayedBooks = 5;
    firstSlice = 0;
    lastSlice = 5;
    filteredBooks;
    noFilteredBooks = false;
    genreValue;
    filtersOn = false;
    error;

    @wire(getObjectInfo, {objectApiName: BookObject}) bookInfo;

    @wire(getPicklistValues, {recordTypeId: '$bookInfo.data.defaultRecordTypeId', fieldApiName: BookGenres}) genres;

    @wire(getAllBooks)
    wiredBooks({ error, data }) {
        if (data) {
            this.allBooks = data;
            this.books = this.allBooks.slice(this.firstSlice, this.lastSlice);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

    changeNumberOfResults(event){
        let clickedString = event.target.id.split('-')[0];
        let clicked = this.template.querySelector(`span[id^="${clickedString}"]`);
        let previousActive = this.template.querySelector(`span[class*="active"]`);

        previousActive.classList.remove('active');
        clicked.classList.add('active');

        switch(clickedString){
            case 'five':
                this.numberOfDisplayedBooks = 5;
                break;
            case 'ten':
                this.numberOfDisplayedBooks = 10;
                break;
            case 'fifteen':
                this.numberOfDisplayedBooks = 15;
                break;
        }

        this.firstSlice = 0;
        this.lastSlice = this.numberOfDisplayedBooks;

        if(this.filtersOn){
            this.books = this.filteredBooks.slice(this.firstSlice, this.lastSlice);
        }
        else{
            this.books = this.allBooks.slice(this.firstSlice, this.lastSlice); 
        }
    }

    changeResults(event){
        let clickedString = event.target.id.split('-')[0];

        switch(clickedString){
            case 'previous':
                if((this.numberOfDisplayedBooks === 5 && this.firstSlice>4) || (this.numberOfDisplayedBooks === 10 && this.firstSlice>9) || (this.numberOfDisplayedBooks === 15 && this.firstSlice>14)){
                    this.firstSlice -= this.numberOfDisplayedBooks;
                    this.lastSlice -= this.numberOfDisplayedBooks;
                    if(this.filtersOn){
                        this.books = this.filteredBooks.slice(this.firstSlice, this.lastSlice);
                    }
                    else{
                        this.books = this.allBooks.slice(this.firstSlice, this.lastSlice); 
                    }
                    window.scrollTo({top: 0});
                }
                break;
            case 'next':
                if(this.filtersOn){
                    if(this.lastSlice<this.filteredBooks.length){
                        this.firstSlice += this.numberOfDisplayedBooks;
                        this.lastSlice += this.numberOfDisplayedBooks;
                        this.books = this.filteredBooks.slice(this.firstSlice, this.lastSlice);
                        window.scrollTo({top: 0});
                    }
                }
                else{
                    if(this.lastSlice<this.allBooks.length){
                        this.firstSlice += this.numberOfDisplayedBooks;
                        this.lastSlice += this.numberOfDisplayedBooks;
                        this.books = this.allBooks.slice(this.firstSlice, this.lastSlice); 
                        window.scrollTo({top: 0});
                    }
                }
                break;
        }

    }

    filterGenre(event){
        this.genreValue = event.target.value;
        this.firstSlice = 0;
        this.lastSlice = this.numberOfDisplayedBooks;
        if(this.genreValue === undefined){
            this.filtersOn = false;
            this.noFilteredBooks = false;
            this.books = this.allBooks.slice(this.firstSlice, this.lastSlice);
        }
        else{
            this.filtersOn = true;
            getAllBooksByGenre({
                genre: this.genreValue
            }).then(books => {
                this.filteredBooks = books;
                if(this.filteredBooks.length===0){
                    this.noFilteredBooks = true;
                }
                else{
                    this.noFilteredBooks = false;
                    this.books = this.filteredBooks.slice(this.firstSlice, this.lastSlice);
                }
            })
        }
    }

    renderedCallback(){
        let nextButton = this.template.querySelector(`button[id^="next"]`);
        let previousButton = this.template.querySelector(`button[id^="previous"]`);
        if(this.allBooks!=undefined){
            if((this.filtersOn && this.lastSlice>this.filteredBooks.length) || (this.filtersOn===false && this.lastSlice>this.allBooks.length)){
                nextButton.disabled = true;
            }
            else{
                nextButton.disabled = false;
            }
        }
        if((this.numberOfDisplayedBooks === 5 && this.firstSlice<4) || (this.numberOfDisplayedBooks === 10 && this.firstSlice<9) || (this.numberOfDisplayedBooks === 15 && this.firstSlice<14)){
            previousButton.disabled = true;
        }
        else{
            previousButton.disabled = false;
        }
    }
}