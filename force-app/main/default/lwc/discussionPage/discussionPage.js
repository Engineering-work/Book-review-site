import { LightningElement, wire, api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getDiscussionList from '@salesforce/apex/DiscussionController.getAllDiscussions';


export default class DiscussionPage extends  NavigationMixin(LightningElement) {
    bookId = localStorage.getItem('bookId');
    @wire(getDiscussionList, {bookId: '$bookId'}) 
    discussions

    
    // goToPostsAction(){
    //     localStorage.setItem('id', this.book.Id);

    //     this[NavigationMixin.Navigate]({
    //         type: 'comm__namedPage',
    //         attributes: {
    //             name: 'Szczegoly__c'
    //         }
    //     });
    // }
    
    // connectedCallback(){
    //     let bookid = localStorage.getItem('id');
    //     getBook({
    //         bookId: bookid
    //     }).then(book => {
    //         this.book = book;
    //     })
    // }
    

}