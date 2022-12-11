import { LightningElement } from 'lwc';
import Id from '@salesforce/user/Id';

import getNewestBooks from '@salesforce/apex/HomePageController.getNewestBooks';
import icons from '@salesforce/resourceUrl/otherImages';

export default class MainPage extends LightningElement {

    Id = Id;

    previous = icons + '/otherImages/previous.png';
    next = icons + '/otherImages/next.png';

    loggedInUser = true;
    username = 'user13';

    suggestedBooks;
    newBooks;

    connectedCallback(){
        console.log(this.Id);

        getNewestBooks({}).then(books => {
            this.newBooks = books;
        })
    }
}