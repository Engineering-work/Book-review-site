import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import {refreshApex} from '@salesforce/apex';

import getBook from '@salesforce/apex/BookController.getBook';

import icons from '@salesforce/resourceUrl/otherImages';

import getBookRatings from '@salesforce/apex/BookRatingController.getBookRatings';

export default class BookDetailsPage extends NavigationMixin(LightningElement) {
    book;
    ratings;
    star = icons + '/otherImages/star.png';
    @track ispopupactive = false;
    ratingsEmpty;
    wiredRatings;
    wiredBook;
    book;

    @wire(getBook, {bookId: localStorage.getItem('bookid')}) book(result){
        this.wiredBook = result;
        if(result.data){
            this.book = result.data;
        }
        else if(result.error){
            this.error = result.error;
        }
    };
    @wire(getBookRatings, {bookId: localStorage.getItem('bookid')}) ratings(result){
        this.wiredRatings = result;
        if(result.data){
            this.ratings = result.data;
            if(this.ratings.length == 0){
                this.ratingsEmpty = true;
            }
            else{
                this.ratingsEmpty = false;
            }
        }
        else if(result.error){
            this.error = result.error;
        }
    };

    goToDiscussions(){
        localStorage.setItem('bookName', this.book.Title__c);
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Dyskusje__c'
            }
        });
        
    }
    goToReviews(){
       localStorage.setItem('bookName', this.book.Title__c);
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Rezenzja__c'
            }
        });

    }

    goToAuthorAction(){
        localStorage.setItem('authorid', this.book.Author__c);

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Autor__c'
            }
        });
    }

    goToSeriesAction(){
        localStorage.setItem('seriesid', this.book.Book_Series__r.Id);

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Seria__c'
            }
        });
    }
    handleAddRating(){
        if(this.ispopupactive === false){
            this.ispopupactive = true;
        }
    }
    handleispopupactiveChange(event){
        this.ispopupactive = event.detail;
    }
    handleRatingsChange(){
        refreshApex(this.wiredRatings);
        refreshApex(this.wiredBook);
        if(this.wiredRatings == 0){
            this.ratingsEmpty = true;
        }
        else{
            this.ratingsEmpty = false;
        }
    }
}
