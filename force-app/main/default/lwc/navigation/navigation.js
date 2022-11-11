import { LightningElement, wire } from 'lwc';

import logo from '@salesforce/resourceUrl/otherImages';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

export default class Navigation extends NavigationMixin(LightningElement) {
    logoSRC = logo + '/otherImages/logo.png';

    _CurrentPageReference;
    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        this._CurrentPageReference = pageRef;
    }

    loggedInUser = true;
    username = 'user13';
    sfdcBaseURL;

    handleProfileHover(){
        const dropdownContainer = this.template.querySelector('.dropdownContent');
        dropdownContainer.style.display = 'flex';
    }

    handleProfileUnhover(){
        const dropdownContainer = this.template.querySelector('.dropdownContent');
        dropdownContainer.style.display = 'none';
    }

    renderedCallback(){
        let activeNavItemName = this._CurrentPageReference.attributes.name.split('_')[0];
        if(activeNavItemName==='Katalog' || activeNavItemName==='Rankingi'){
            let navItemInHTML = this.template.querySelector(`a[id^="${activeNavItemName}"]`);
            navItemInHTML.style.backgroundColor = '#FFB2B2';
            navItemInHTML.style.fontWeight = 'bold';
        }
    }

}