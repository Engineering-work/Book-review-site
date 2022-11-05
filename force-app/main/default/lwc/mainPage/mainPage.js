import { LightningElement } from 'lwc';

import icons from '@salesforce/resourceUrl/otherImages';

export default class MainPage extends LightningElement {

    previous = icons + '/otherImages/previous.png';
    next = icons + '/otherImages/next.png';

    loggedInUser = true;
    username = 'user13';
}