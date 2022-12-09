import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import getBook from '@salesforce/apex/BookController.getBook';
import bookImages from '@salesforce/resourceUrl/bookImages';
import icons from '@salesforce/resourceUrl/otherImages';
import profileImages from '@salesforce/resourceUrl/profileImages';

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
ratings = ratings;
star = icons + '/otherImages/star.png';
@track ispopupactive = false;

    goToDiscussions(){
        localStorage.setItem('bookId', this.book.Id);

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Dyskusje__c'
            }
        });
        
    }
    goToReviews(){

    }

    goToAuthorAction(){
        localStorage.setItem('id', this.book.Author__c);

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Autor__c'
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
        let bookid = localStorage.getItem('id');
        getBook({
            bookId: bookid
        }).then(book => {
            this.book = book;
        })
    }
}