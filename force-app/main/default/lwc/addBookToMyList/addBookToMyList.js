import { LightningElement, api, wire, track } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import BookListObject from "@salesforce/schema/Book_List_Item__c";
import BookStatus from "@salesforce/schema/Book_List_Item__c.Status__c";
import Id from '@salesforce/user/Id';
import addBookListItem from '@salesforce/apex/BookListController.addBookListItem';
import getBookwormUser from '@salesforce/apex/UserController.getBookwormUser';

export default class AddBookToMyList extends LightningElement {
    @api ispopupactive;
    @track titleValue;
    @track selectedTitle = false;
    profile;
    bookId;
    loggedInUser;
    statusValue = null;

    @wire(getObjectInfo, {objectApiName: BookListObject}) bookListInfo;

    @wire(getPicklistValues, {recordTypeId: '$bookListInfo.data.defaultRecordTypeId', fieldApiName: BookStatus}) status;

    onTitleselection(event){
        this.titleValue = event.detail.selectedTitle;
        if(this.titleValue!==null){
            this.selectedTitle = true;
        }
        this.bookId = event.detail.selectedBookId;
    }

    closeModal(){
        this.ispopupactive = false;
        const changePopupStateEvent = new CustomEvent("ispopupactivechange", {
            detail: this.ispopupactive
        });
          
        this.dispatchEvent(changePopupStateEvent);
    }

    handleStatusChange(event){
        this.statusValue = event.detail.value;
    }

    addBookToMyList(){
            if(this.bookId === null){

            }
            else{
                addBookListItem({
                    bookId: this.bookId,
                    bookwormUserId: this.profile.Id,
                    status: this.statusValue
                }).then(result => {
                    console.log(result);
                    this.closeModal();
                    const updateMyListEvent = new CustomEvent("mylistchange", {});
                    this.dispatchEvent(updateMyListEvent);
                });
            }
    }
    connectedCallback(){
        if(Id !== null && Id !== undefined){
            if(Id !== "0057S000000bDjTQAU"){
                this.loggedInUser = true;
                getBookwormUser({
                    SFUserId: Id
                }).then(user => {
                    this.profile = user;
                })
            }
            else{
                this.loggedInUser = false;
            }
        }
        else{
            this.loggedInUser = false;
        }
    }
}