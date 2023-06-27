import { LightningElement, track, wire } from 'lwc';
import {refreshApex} from '@salesforce/apex';
import Id from '@salesforce/user/Id';
import getBookwormUser from '@salesforce/apex/UserController.getBookwormUser';

export default class ProfilePage extends LightningElement {
    profile;
    wiredUser;
    @track changeUserDataPopup = false;
    
    @wire(getBookwormUser, {SFUserId: Id}) profile(result){
        this.wiredUser = result;
        if(result.data){
            this.profile = result.data;
        }
        else if(result.error){
            this.error = result.error;
        }
    };

    changeUserDataPopuphandle(){
        if(this.changeUserDataPopup === false){
            this.changeUserDataPopup = true;
        }
    }
    handleispopupactiveChange(event){
        this.changeUserDataPopup = event.detail;
    }
    closeModal(){
        this.changeUserDataPopup = false;
    }

    handleUserChange(){
        refreshApex(this.wiredUser);
    }
}