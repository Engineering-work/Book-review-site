import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getDiscussion from '@salesforce/apex/DiscussionController.getDiscussion';
import getAllPosts from '@salesforce/apex/PostController.getAllPosts';
import createPost from '@salesforce/apex/PostController.createPost';
import currentUserId from '@salesforce/user/Id';




// const test =  {user_icon: profile + '/authorImages/authorImage2.jpg'}

export default class DiscussionPostsPage  extends  NavigationMixin(LightningElement) {
    bookName = localStorage.getItem('bookName');
    msg = "";
    discussionId = localStorage.getItem('discussionId');;
    userId = currentUserId;
    
    @wire(getDiscussion, {discussionId: '$discussionId'}) discussion;
    @wire(getAllPosts, {discussionId: '$discussionId'}) posts;
 
    connectedCallback(){
        console.log(this.id);
    }
       handleSubmit(){
        // console.log(this.msg);
        // console.log(this.userId);
        // console.log(this.discussionId);
        createPost({name: 'cos', content: 'fghjtyhrgfseda', userId: this.userId, discussionId: this.discussionId}).then(result => {
            console.log(result)
        })
        .catch(error => {
            this.error = error;
        });
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
    
}