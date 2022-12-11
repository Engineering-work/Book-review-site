import { LightningElement, track } from 'lwc';
import Id from '@salesforce/user/Id';
import profileImages from '@salesforce/resourceUrl/profileImages';
import getBookwormUser from '@salesforce/apex/UserController.getBookwormUser';

const profile = 
    {   
        id: 0,
        name: 'Mariia Kazanov',
        src: profileImages + '/profileImages/mariia.png',
        email: 'mariia3x@gmail.com',
        login: 'user13'
    }

export default class ProfilePage extends LightningElement {
    profile;
    @track changeUserDataPopup = false;
    

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

    connectedCallback(){
        getBookwormUser({
            SFUserId: Id
        }).then(user => {
            this.profile = user;
        })
    }
}