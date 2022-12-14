import { LightningElement, wire, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getDiscussionList from '@salesforce/apex/DiscussionController.getAllDiscussions';
import addNewDiscussion from '@salesforce/apex/DiscussionController.addNewDiscussion';
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



    titleChange(event){
        this.newDiscussionTitle= event.target.value;

    }
    postChange(event){
        this.newFirstPost= event.target.value;

    }


    @wire(getDiscussionList, {bookId: '$bookId'}) discussions(result){
        this.wiredDiscussions = result;
        if(result.data){
            this.discussions = result.data;
        }
        else if(result.error){
            this.error = result.error;
        }
    };
    @wire(getBookwormUser, {SFUserId: Id}) 
    bookwormUserId;

    
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
        })

            refreshApex(this.wiredDiscussions);
        
        this.addDiscussion = false;
    }

    closeModal() {
        this.addDiscussion = false;
    }

    connectedCallback(){
                getBookwormUser({
                    SFUserId: Id
                }).then(user => {
                    this.profile = user;
                })
            }
            
}