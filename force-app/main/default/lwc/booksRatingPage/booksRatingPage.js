import { LightningElement, wire } from 'lwc';



import getAllBooksToRanking from '@salesforce/apex/BookController.getAllBooksToRanking';

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