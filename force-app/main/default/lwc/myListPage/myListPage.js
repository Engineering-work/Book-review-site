import { LightningElement, wire, track } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import BookListObject from "@salesforce/schema/Book_List_Item__c";
import BookStatus from "@salesforce/schema/Book_List_Item__c.Status__c";
import Id from '@salesforce/user/Id';
import getUserBooks from '@salesforce/apex/BookListController.getUserBooks'

export default class MyListPage extends LightningElement {

    books;
    @track isAddBookPopupactive = false;

    @wire(getObjectInfo, {objectApiName: BookListObject}) bookListInfo;

    @wire(getPicklistValues, {recordTypeId: '$bookListInfo.data.defaultRecordTypeId', fieldApiName: BookStatus}) status;

    handleAddBook(event){
        if(this.isAddBookPopupactive === false){
            this.isAddBookPopupactive = true;
        }
    }
    handleispopupactiveChange(event){
        this.isAddBookPopupactive = event.detail;
    }
    connectedCallback(){
        getUserBooks({
            bookwormUserId: Id
        }).then(books => {
            this.books = books;
            console.log(this.books);
            console.log(Id);
        })
    }
}