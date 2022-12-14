import { LightningElement } from 'lwc';
import Id from '@salesforce/user/Id';

import getUserSuggestion from '@salesforce/apex/BookSuggestionController.getUserSuggestion';
import getNewestBooks from '@salesforce/apex/HomePageController.getNewestBooks';
import icons from '@salesforce/resourceUrl/otherImages';

export default class MainPage extends LightningElement {

    previous = icons + '/otherImages/previous.png';
    next = icons + '/otherImages/next.png';


    loggedInUser = false;
    
    suggestedBooks;
    newBooks;

    connectedCallback(){
        if(Id !== null && Id !== undefined){
            if(Id !== "0057S000000bDjTQAU"){
                this.loggedInUser = true;
                console.log('userId'+' '+Id);
                getUserSuggestion({
                    SFUserId: Id
                }).then(books => {
                    this.suggestedBooks = books;
                    console.log(this.suggestedBooks);
                })
            }
            else{
                this.loggedInUser = false;
            }
        }

        getNewestBooks({}).then(books => {
            this.newBooks = books;
        })
    }
}