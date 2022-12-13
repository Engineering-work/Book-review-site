import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import logo from '@salesforce/resourceUrl/otherImages';
import Id from '@salesforce/user/Id';
import basePath from "@salesforce/community/basePath";
import getBookwormUser from '@salesforce/apex/UserController.getBookwormUser';

export default class Navigation extends NavigationMixin(LightningElement) {
    logoSRC = logo + '/otherImages/logo.png';

    _CurrentPageReference;
    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        this._CurrentPageReference = pageRef;
    }

    @track loggedInUser = false;
    profile;

    handleProfileHover(){
        const dropdownContainer = this.template.querySelector('.dropdownContent');
        dropdownContainer.style.display = 'flex';
    }

    handleProfileUnhover(){
        const dropdownContainer = this.template.querySelector('.dropdownContent');
        dropdownContainer.style.display = 'none';
    }

    get logoutLink() {
        const sitePrefix = basePath.replace(/\/s$/i, ""); // site prefix is the site base path without the trailing "/s"
        return sitePrefix + "/secur/logout.jsp";
    }

    connectedCallback(){
        if(Id !== null && Id !== undefined){
            if(Id !== "0057S000000bDjTQAU"){
                this.loggedInUser = true;
                getBookwormUser({
                    SFUserId: Id
                }).then(user => {
                    this.profile = user;
                })
            }
            else{
                this.loggedInUser = false;
            }
        }
        else{
            this.loggedInUser = false;
        }
    }

    renderedCallback(){
        let activeNavItemName = this._CurrentPageReference.attributes.name.split('_')[0];
        if(activeNavItemName==='Katalog' || activeNavItemName==='Rankingi' || activeNavItemName==='MojaLista' || activeNavItemName==='Profil'){
            let navItemInHTML = this.template.querySelector(`a[id^="${activeNavItemName}"]`);
            if(navItemInHTML !== null){
                navItemInHTML.style.backgroundColor = '#FFB2B2';
                navItemInHTML.style.fontWeight = 'bold';
            }
        }
    }

}