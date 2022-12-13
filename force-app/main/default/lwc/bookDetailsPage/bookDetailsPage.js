import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import getBook from '@salesforce/apex/BookController.getBook';

import icons from '@salesforce/resourceUrl/otherImages';
import profileImages from '@salesforce/resourceUrl/profileImages';

import getBookRatings from '@salesforce/apex/BookRatingController.getBookRatings';


const ratings = [
    {   
        id: 0,
        name: 'Mariia',
        description: 'Wciągająca, porywająca, fantastyczna!',
        src: profileImages + '/profileImages/mariia.png',
        number: 9
    },
    {   
        id: 1,
        name: 'Borys',
        description: 'Autor nie oszukuje; pokazuje świat takim, jakim jest - szarym, nie czarno-białym.',
        src: profileImages + '/profileImages/borys.png',
        number: 9
    }
]

export default class BookDetailsPage extends NavigationMixin(LightningElement) {
book;
ratings;
star = icons + '/otherImages/star.png';
@track ispopupactive = false;
ratingsEmpty;

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
    connectedCallback(){

        let bookid = localStorage.getItem('bookid');
        getBook({
            bookId: bookid
        }).then(book => {
            this.book = book;
        })

        getBookRatings({
            bookId: bookid
        }).then(ratings=> {
            this.ratings = ratings;
            if(ratings.length===0){
                this.ratingsEmpty = true;
            }
        })

    }
}
