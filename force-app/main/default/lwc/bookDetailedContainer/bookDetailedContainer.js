import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BookDetailedContainer extends NavigationMixin(LightningElement) {
    @api book;
    @api bookcontainertype;
    @api authorbooks;
    series = false;
    bookListPage;
    booksContainer;

    goToDetailsAction(){
        localStorage.setItem('bookid', this.book.Id);

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Szczegoly__c'
            }
        });
    }

    goToAuthorAction(){
        localStorage.setItem('authorid', this.book.Author__c);

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Autor__c'
            }
        });
    }

    connectedCallback(){
        if(this.bookcontainertype === 'listPage'){
            this.bookListPage = true;
        }
        else if(this.bookcontainertype === 'booksContainer'){
            this.booksContainer = true;
        }
    }
}