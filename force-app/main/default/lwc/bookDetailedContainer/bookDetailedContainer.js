import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import changeBookListItemStatus from '@salesforce/apex/BookListController.changeBookListItemStatus';
import deleteBookListItem from '@salesforce/apex/BookListController.deleteBookListItem';

export default class BookDetailedContainer extends NavigationMixin(LightningElement) {
    @api book;
    @api bookcontainertype;
    @api authorbooks;
    @api seriesbooks;
    series = false;
    bookListPage;
    booksContainer;
    bookListItem;

    showAuthor = true;
    statusValue = '';

    goToDetailsAction(){
        localStorage.setItem('bookid', this.book.Id);

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Szczegoly__c'
            }
        });
    }

    goToSeriesAction(){
        localStorage.setItem('seriesid', this.book.Book_Series__r.Id);

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Seria__c'
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

    handleStatusChange(event){
        changeBookListItemStatus({
            bookListItemId: book.Id,
            newStatus: event.detail.value
        }).then(result => {
            console.log(result);
        })
    }

    handleDeleteListItem(){
        deleteBookListItem({
            bookListItem: book.Id
        }).then(result => {
            console.log(result);
        })
    }

    connectedCallback(){
        if(this.bookcontainertype === 'listPage'){
            this.bookListPage = true;
        }
        else if(this.bookcontainertype === 'booksContainer'){
            this.booksContainer = true;
        }
        else if(this.bookcontainertype === 'bookListItem'){
            this.bookListItem = true;
        }

        if(this.authorbooks === true || this.seriesbooks === true){
            this.showAuthor = false;
        }
    }
}