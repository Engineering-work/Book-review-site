import { LightningElement, wire, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getDiscussionList from '@salesforce/apex/DiscussionController.getAllDiscussions';
import addNewDiscussion from '@salesforce/apex/DiscussionController.addNewDiscussion';
import userHasDiscussion from '@salesforce/apex/DiscussionController.userHasDiscussion';
import getBookwormUser from '@salesforce/apex/UserController.getBookwormUser';
import Id from '@salesforce/user/Id';
import {refreshApex} from '@salesforce/apex';

export default class DiscussionPage extends  NavigationMixin(LightningElement) {
    bookId = localStorage.getItem('bookid');
    bookName = localStorage.getItem('bookName');  
    @track addDiscussion = false;
    discussions;
    wiredDiscussions;
    newDiscussionTitle= null;
    newFirstPost = null;

    loggedInUser = false;

    discussionsEmpty = false;

    userdiscussion;
    thisDiscussion;
    wiredUserDiscussion;



    titleChange(event){
        this.newDiscussionTitle= event.target.value;

    }
    postChange(event){
        this.newFirstPost= event.target.value;

    }

    @wire(getBookwormUser, {SFUserId: Id}) 
    bookwormUserId;

    @wire(getDiscussionList, {bookId: '$bookId'}) discussions(result){
        this.wiredDiscussions = result;
        if(result.data){
            this.discussions = result.data;
            if(result.data.length===0){
                this.discussionsEmpty = true;
            }
        }
        else if(result.error){
            this.error = result.error;
        }
    };

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

    addDiscussionRecord() {
        console.log(this.bookwormUserId.data.Id)
        console.log(this.bookId)
        console.log(this.newDiscussionTitle)
        console.log(this.newFirstPost)
        addNewDiscussion({title: this.newDiscussionTitle, 
            firstPost: this.newFirstPost, 
            userId: this.bookwormUserId.data.Id, 
            bookId: this.bookId
        }).then(el =>{
            console.log(el);
            refreshApex(this.wiredDiscussions);
        })

           
        
        this.addDiscussion = false;
    }

    editDiscussionRecord() {

        console.log('edit')
        this.addDiscussion = false;
    }

    deleteDiscussionRecord() {

        console.log('delete');
        this.addDiscussion = false;
    }

    closeModal() {
        this.addDiscussion = false;
    }
 

    connectedCallback(){
        if(Id !== null && Id !== undefined){
            if(this.userId !== "0057S000000bDjTQAU"){
                this.loggedInUser = true;
                console.log('userId'+' '+this.userId);
            }
            else{
                this.loggedInUser = false;
            }
        }
            userHasDiscussion({
                SFuserId: Id,
                bookId: this.bookId
                }).then(hasDiscussion =>{
                    this.thisDiscussion= hasDiscussion;
                    console.log(this.thisDiscussion)
                })
           
            } 
}