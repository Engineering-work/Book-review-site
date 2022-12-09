import { LightningElement, api } from 'lwc';

export default class PopUp extends LightningElement {
    @api popuptype;
    @api ispopupactive;
    addRating = false;
    addBook = false;
    editUserData = false;
    username = 'user13';
    name = 'Mariia';
    
    closeModal(){
        this.ispopupactive = false;
        const changePopupStateEvent = new CustomEvent("ispopupactivechange", {
            detail: this.ispopupactive
        });
          
        this.dispatchEvent(changePopupStateEvent);
    }
    
    connectedCallback(){
        if(this.popuptype === 'addRating'){
            this.addRating = true;
        }
        else if(this.popuptype === 'addBookToMyList'){
            this.addBook = true;
        }
        else if(this.popuptype === 'editUserData'){
            this.editUserData = true;
        }
    }

    changeDataHandler(event){
        let clicked = event.target.id.split('-')[0]
        let field = this.template.querySelector(`lightning-input[id^="${clicked}"]`);
        if(clicked==='username'){
            
        }
        else{
            
        }

    }
}