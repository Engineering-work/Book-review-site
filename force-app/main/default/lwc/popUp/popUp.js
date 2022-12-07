import { LightningElement, api } from 'lwc';

export default class PopUp extends LightningElement {
    @api popuptype;
    @api ispopupactive;
    addRating= false;
    addRating= true;
    
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
        else if(this.popuptype === 'addBook'){
            this.addBook = true;
        }
    }
}