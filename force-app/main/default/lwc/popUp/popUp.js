import { LightningElement, api, wire, track } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import BookListObject from "@salesforce/schema/Book_List_Item__c";
import BookStatus from "@salesforce/schema/Book_List_Item__c.Status__c";
import Id from '@salesforce/user/Id';
import addBookListItem from '@salesforce/apex/BookListController.addBookListItem';
import getBookwormUser from '@salesforce/apex/UserController.getBookwormUser';

export default class PopUp extends LightningElement {
    @api popuptype;
    @api ispopupactive;
    @track titleValue;
    @track selectedTitle = false;
    addRating = false;
    addBookToMyList = false;
    editUserData = false;
    @track loggedInUser = false;
    profile;
    bookId;

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
    
    connectedCallback(){
        if(this.popuptype === 'addRating'){
            this.addRating = true;
        }
        else if(this.popuptype === 'addBookToMyList'){
            this.addBookToMyList = true;
        }
        else if(this.popuptype === 'editUserData'){
            this.editUserData = true;
        }
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

    handleStatusChange(event){
        this.statusValue = event.detail.value;
    }

    sendData(event){
        if(this.addBookToMyList){
            if(this.titleValue === null){

            }
            else{
                console.log(this.bookId + ' ' +Id+''+this.statusValue);
                addBookListItem({
                    bookId: this.bookId,
                    bookwormUserId: Id,
                    status: this.statusValue
                }).then(result => {
                    console.log(result);
                    this.closeModal();
                });
            }
        }else{
            this.closeModal();
        }
    }

    changeDataHandler(event){
        let clicked = event.target.id.split('-')[0]
        let field = this.template.querySelector(`lightning-input[id^="${clicked}"]`);
        if(clicked==='username'){
            
        }
        else{
            
        }

    }
}