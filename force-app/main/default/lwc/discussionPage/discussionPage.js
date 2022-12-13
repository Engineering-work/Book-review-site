import { LightningElement, wire, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getDiscussionList from '@salesforce/apex/DiscussionController.getAllDiscussions';


export default class DiscussionPage extends  NavigationMixin(LightningElement) {
    bookId = localStorage.getItem('id');
    bookName = localStorage.getItem('bookName');

    @track addDiscussion = false;

    @wire(getDiscussionList, {bookId: '$bookId'}) 
    discussions

    
    goToBookDetails(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Szczegoly__c'
            }
        });       
    }

    addDiscussionAction() {
        this.addDiscussion = true;
    }

    closeModal() {

        this.addDiscussion = false;
    }
}