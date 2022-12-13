import { LightningElement, api , wire} from 'lwc';
import {refreshApex} from '@salesforce/apex';
import Id from '@salesforce/user/Id';
import getBookwormUser from '@salesforce/apex/UserController.getBookwormUser';
import changeNickname from '@salesforce/apex/UserController.changeNickname';

export default class EditUserData extends LightningElement {
    @api ispopupactive;
    profile;
    loggedInUser;
    wiredUser;

    @wire(getBookwormUser, {SFUserId: Id}) profile(result){
        this.wiredUser = result;
        if(result.data){
            this.profile = result.data;
        }
        else if(result.error){
            this.error = result.error;
        }
    };

    closeModal(){
        this.ispopupactive = false;
        const changePopupStateEvent = new CustomEvent("ispopupactivechange", {
            detail: this.ispopupactive
        });
          
        this.dispatchEvent(changePopupStateEvent);
    }

    editUserData(){
        let email = this.template.querySelector(`lightning-input`);
        if(email.value !== undefined){
            changeNickname({
                SFUserId: Id, 
                nickname: email.value
            }).then(user => {
                console.log(user);
                this.closeModal();
                refreshApex(this.wiredUser);
                const updateUserEvent = new CustomEvent("userchange", {});
                this.dispatchEvent(updateUserEvent);
            })
        }
    }
    
}