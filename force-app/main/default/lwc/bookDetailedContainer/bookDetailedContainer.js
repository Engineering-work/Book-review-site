import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BookDetailedContainer extends NavigationMixin(LightningElement) {
    @api book;
    series = false;

    goToDetailsAction(){
        localStorage.setItem('id', this.book.Id);

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Szczegoly__c'
            }
        });
    }

    goToAuthorAction(){
        localStorage.setItem('id', this.book.Author__c);

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Autor__c'
            }
        });
    }


}