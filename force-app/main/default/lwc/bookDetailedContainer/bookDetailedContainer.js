import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BookDetailedContainer extends NavigationMixin(LightningElement) {
    @api book;
    series = false;

    navigateAction(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Szczegoly__c',
                id: this.book.id
            }
        });
    }
}