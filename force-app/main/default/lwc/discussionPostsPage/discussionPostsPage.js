import { LightningElement, wire, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getDiscussion from '@salesforce/apex/DiscussionController.getDiscussion';
import getAllPosts from '@salesforce/apex/PostController.getAllPosts';
import createPost from '@salesforce/apex/PostController.createPost';
import getBookwormUser from '@salesforce/apex/UserController.getBookwormUser';
import Id from '@salesforce/user/Id';
import {refreshApex} from '@salesforce/apex';



export default class DiscussionPostsPage  extends  NavigationMixin(LightningElement) {
    bookName = localStorage.getItem('bookName');
    discussionId = localStorage.getItem('discussionId');
    discussion;
    wiredDiscussion;
    posts;
    wiredPosts;
    content = null
    loggedInUser = false
    userId;
    postsEmpty;

    @wire(getDiscussion, {discussionId: localStorage.getItem('discussionId')}) discussion(result){
        this.wiredDiscussion = result;
        if(result.data){
            this.discussion = result.data;
            refreshApex(this.wiredDiscussion);
        }
        else if(result.error){
            this.error = result.error;
        }
    };

    @wire(getAllPosts, {discussionId: localStorage.getItem('discussionId')}) posts(result){
        this.wiredPosts = result;
        if(result.data){
            this.posts = result.data;
            if(result.data.length===0){
                this.postsEmpty = true;
            }
            else{
                this.postsEmpty = false;
            }
           

        }
        else if(result.error){
            this.error = result.error;
        }
    };

   
    changePost(event){
        this.content = event.target.value;
    }
 
    addPost() {
        createPost({content: this.content, 
            userId: this.bookwormUser.Id, 
            discussionId: this.discussionId
        }).then(result => {
            console.log(result);
            refreshApex(this.wiredPosts);
            
        })  
    }
    
    
       goToDiscusionAction(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Dyskusje__c'
            }
        });
    }

       goToBookDetailsAction(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Szczegoly__c'
            }
        });
        
    }

    changeReviewState(){
        console.log('refresh');
        refreshApex(this.wiredPosts);
    }

    connectedCallback(){
        if(Id !== null && Id !== undefined){
            if(this.userId !== "0057S000000bDjTQAU"){
                this.loggedInUser = true;
                getBookwormUser({
                    SFUserId: Id
                }).then(user => {
                    this.bookwormUser = user;
                    localStorage.setItem('userId', this.bookwormUser.Id);
                })
            }
            else{
                this.loggedInUser = false;
            }
        }
        
    }
    
}