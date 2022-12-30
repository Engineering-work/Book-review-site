import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import BookListObject from "@salesforce/schema/Book_List_Item__c";
import BookStatus from "@salesforce/schema/Book_List_Item__c.Status__c";
import changeBookListItemStatus from '@salesforce/apex/BookListController.changeBookListItemStatus';
import deleteBookListItem from '@salesforce/apex/BookListController.deleteBookListItem';

export default class BookDetailedContainer extends NavigationMixin(LightningElement) {
    @api book;
    @api bookcontainertype;
    @api authorbooks;
    @api seriesbooks;
    @api bookscomponent;
    series = false;
    bookListPage;
    booksContainer;
    bookListItem;
    recommended = false;

    showAuthor = true;
    statusValue = '';

    @wire(getObjectInfo, {objectApiName: BookListObject}) bookListInfo;

    @wire(getPicklistValues, {recordTypeId: '$bookListInfo.data.defaultRecordTypeId', fieldApiName: BookStatus}) status;


    goToDetailsAction(){
        localStorage.setItem('bookid', this.book.Id);

        localStorage.setItem('bookid', this.book.Id);


        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Szczegoly__c'
            }
        });
    }

    goToSeriesAction(){
        if(this.book.Book_Series__r.Name == 'Brak'){
            
        }
        else{
            localStorage.setItem('seriesid', this.book.Book_Series__r.Id);

            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: 'Seria__c'
                }
            });
        }
    }

    goToAuthorAction(){
        localStorage.setItem('authorid', this.book.Author__c);

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
            bookListItemId: this.book.Id,
            newStatus: event.detail.value
        }).then(result => {
            console.log(result);
        })
    }

    handleDeleteListItem(){
        deleteBookListItem({
            bookListItemId: this.book.Id
        }).then(result => {
            console.log(result);
            const updateMyListEvent = new CustomEvent("mylistchange", {});
            this.dispatchEvent(updateMyListEvent);
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
        
        if(this.bookscomponent === 'recommended'){
            this.recommended = true;
        }

        if(this.authorbooks === true || this.seriesbooks === true){
            this.showAuthor = false;
        }
        console.log(this.recommended);
        console.log(this.book);
    }        
}