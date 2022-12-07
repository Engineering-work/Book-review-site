import { LightningElement, wire, track } from 'lwc';

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

export default class BookDetailsPage extends LightningElement {
//id;
book;
ratings = ratings;
star = icons + '/otherImages/star.png';
@track ispopupactive = false;

    goToDiscussions(){
        
    }
    goToReviews(){

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