import { LightningElement, wire, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getThisDiscussion from '@salesforce/apex/DiscussionController.getDiscussion';
import getAllPosts from '@salesforce/apex/PostController.getAllPosts';
import createPost from '@salesforce/apex/PostController.createPost';
import getBookwormUser from '@salesforce/apex/UserController.getBookwormUser';
import Id from '@salesforce/user/Id';
import {refreshApex} from '@salesforce/apex';



export default class DiscussionPostsPage  extends  NavigationMixin(LightningElement) {
    bookName = localStorage.getItem('bookName');
    discussionId = localStorage.getItem('discussionId');
    @api discussion;
    posts;
    wiredPosts;
    content = null
    loggedInUser = false
    userId;
    postsEmpty = false

    // @wire(getBookwormUser, {SFUserId: Id}) 
    // bookwormUserId;

    // @wire(getThisDiscussion, {discussionId: '$discussionId'})
    // discussion

    // @wire(getThisDiscussion, {discussionId: '$discussionId'}) discussion(result){
    //     if(result.data){
    //         this.discussion = result.data;
    //     }
    //     else if(result.error){
    //         this.error = result.error;
    //     }
    // };

    @wire(getAllPosts, {discussionId: '$discussionId'}) posts(result){
        this.wiredPosts = result;
        if(result.data){
            this.posts = result.data;
            console.log(this.posts)
            // if(result.data.lenght===0){
            //     this.postsEmpty = true;
            // }
           

        }
        else if(result.error){
            this.error = result.error;
        }
    };

   
    changePost(event){
        this.content = event.target.value;
    }
 

    addPost() {
        console.log(this.bookwormUserId.Id)
        console.log(this.discussionId)
        console.log(this.content)

        createPost({content: this.content, 
            userId: this.bookwormUserId.Id, 
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

    connectedCallback(){
        if(Id !== null && Id !== undefined){
            if(this.userId !== "0057S000000bDjTQAU"){
                this.loggedInUser = true;
              //  console.log('userId'+' '+this.userId);
            }
            else{
                this.loggedInUser = false;
            }
        }
    }
    
}