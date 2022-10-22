import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import logo from '@salesforce/resourceUrl/otherImages';

export default class Navigation extends LightningElement {

    logoSRC = logo + '/otherImages/logo.png';

    loggedInUser = false;
    username = 'user13';

    handleProfileHover(){
        const dropdownContainer = this.template.querySelector('.dropdownContent');
        dropdownContainer.style.display = 'flex';
    }

    handleProfileUnhover(){
        const dropdownContainer = this.template.querySelector('.dropdownContent');
        dropdownContainer.style.display = 'none';
    }

    navigateHome(){
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'Home'
            },
        });
    }

    navigateLogin(){
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'Login'
            },
        });
    }
}