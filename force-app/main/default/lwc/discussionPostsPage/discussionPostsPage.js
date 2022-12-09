import { LightningElement, wire, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
// import profile from '@salesforce/resourceUrl/images';
import getDiscussion from '@salesforce/apex/DiscussionController.getDiscussion';
import getAllPosts from '@salesforce/apex/PostController.getAllPosts';
import createPost from '@salesforce/apex/PostController.createPost';
import currentUserId from '@salesforce/user/Id';




// const test =  {user_icon: profile + '/authorImages/authorImage2.jpg'}

export default class DiscussionPostsPage extends LightningElement {
    ampm = false;
    // test = test;
    msg = "";
    discussionId = localStorage.getItem('discussionId');;
    userId = currentUserId;
    
    @wire(getDiscussion, {discussionId: '$discussionId'}) discussion;
    @wire(getAllPosts, {discussionId: '$discussionId'}) posts;
 
    connectedCallback(){
        console.log('dwafafafawfafwafa');
        console.log(this.id);
    }
    // changeHandler(event){
    //     const {value, name} = event.target
    //     this.formFields = {...this.formFields, [name]:value}
    //     // this.formFields.Event_Detail = event.target
    //     //this.richtext = event.target.value
    //    // console.log(this.formFields);
    //     //this.formFields.Event_Detail = event.target.Event_Detail
    //    }

       
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
    
}