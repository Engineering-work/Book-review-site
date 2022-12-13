import { LightningElement } from 'lwc';
import Id from '@salesforce/user/Id';

import getNewestBooks from '@salesforce/apex/HomePageController.getNewestBooks';
import icons from '@salesforce/resourceUrl/otherImages';

export default class MainPage extends LightningElement {

    Id = Id;

    previous = icons + '/otherImages/previous.png';
    next = icons + '/otherImages/next.png';

    loggedInUser = false;
    
    suggestedBooks;
    newBooks;

    connectedCallback(){
        if(Id !== null && Id !== undefined){
            if(this.userId !== "0057S000000bDjTQAU"){
                this.loggedInUser = true;
                console.log('userId'+' '+this.userId);
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