import { LightningElement } from 'lwc';

import logo from '@salesforce/resourceUrl/otherImages';

export default class Navigation extends LightningElement {

    logoSRC = logo + '/otherImages/logo.png';

    loggedInUser = true;
    username = 'user13';

    handleProfileHover(){
        const dropdownContainer = this.template.querySelector('.dropdownContent');
        dropdownContainer.style.display = 'flex';
    }

    handleProfileUnhover(){
        const dropdownContainer = this.template.querySelector('.dropdownContent');
        dropdownContainer.style.display = 'none';
    }

}