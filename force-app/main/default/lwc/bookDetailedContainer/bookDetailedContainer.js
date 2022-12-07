import { LightningElement, api } from 'lwc';

export default class BookDetailedContainer extends LightningElement {
    @api book;
    series = false;

    connectedCallback(){
        if(this.book.series!=''){
            this.series = true;
        } 
    }

}