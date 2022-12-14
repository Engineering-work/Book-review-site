import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getDiscussion from '@salesforce/apex/DiscussionController.getDiscussion';
import getAllPosts from '@salesforce/apex/PostController.getAllPosts';
import createPost from '@salesforce/apex/PostController.createPost';
import getBookwormUser from '@salesforce/apex/UserController.getBookwormUser';
import Id from '@salesforce/user/Id';
import {refreshApex} from '@salesforce/apex';



export default class DiscussionPostsPage  extends  NavigationMixin(LightningElement) {
    bookName = localStorage.getItem('bookName');
    discussionId = localStorage.getItem('discussionId');;
    discussion
    wiredDiscussion
    posts
    wiredPosts
    content = null

    @wire(getBookwormUser, {SFUserId: Id}) 
    bookwormUserId;

    @wire(getDiscussion, {discussionId: '$discussionId'}) discussion(result){
        this.wiredDiscussion = result;
        if(result.data){
            this.discussion = result.data;
        }
        else if(result.error){
            this.error = result.error;
        }
    };

    @wire(getAllPosts, {discussionId: '$discussionId'}) posts(result){
        this.wiredPosts = result;
        if(result.data){
            this.posts = result.data;
        }
        else if(result.error){
            this.error = result.error;
        }
    };

   
    changePost(event){
        this.content = event.target.value;
    }
 

    addPost() {
        console.log(this.bookwormUserId.data.Id)
        console.log(this.discussionId)
        console.log(this.content)

        createPost({content: this.content, 
            userId: this.bookwormUserId.data.Id, 
            discussionId: this.discussionId
        }).then(result => {
            console.log(result)
        })

            refreshApex(this.wiredPosts);
        
        this.addDiscussion = false;
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

    connectedCallback(){
        getBookwormUser({
            SFUserId: Id
        }).then(user => {
            this.profile = user;
        })
    }
    
}
    


    // @wire(getDiscussion, {discussionId: '$discussionId'}) discussion;
    // @wire(getAllPosts, {discussionId: '$discussionId'}) posts;