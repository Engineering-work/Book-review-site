import { LightningElement, wire, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getDiscussion from '@salesforce/apex/DiscussionController.getDiscussion';
import getAllPosts from '@salesforce/apex/PostController.getAllPosts';
import createPost from '@salesforce/apex/PostController.createPost';
import deletePost from '@salesforce/apex/PostController.deletePost';
import updatePost from '@salesforce/apex/PostController.updatePost';
import getBookwormUser from '@salesforce/apex/UserController.getBookwormUser';
import Id from '@salesforce/user/Id';
import { refreshApex } from '@salesforce/apex';


export default class PostContainer extends LightningElement {

    bookName = localStorage.getItem('bookName');
    discussionId = localStorage.getItem('discussionId');
    discussion;
    posts;
    wiredPosts;
    content = null
    loggedInUser = false
    userId;
    postsEmpty = false

    editPost = false;
    @api post;
    postContent;
    userPost = false;
    changePost(event) {
        this.postContent = event.target.value;
    }


    deletePostAction() {
        console.log(this.post)
        const changeReviewRaingStateEvent = new CustomEvent("changereviewstate", {
        });
        deletePost({
            post: this.post
        }).then(result => {
            console.log(result);
            this.dispatchEvent(changeReviewRaingStateEvent);
        })
    }

    editPostAction() {
        this.editPost = true;
    }

    editPostRecord() {
        console.log(this.post)
        const changeReviewRaingStateEvent = new CustomEvent("changereviewstate", {
        });
        updatePost({
            post: this.post,
            content: this.postContent
        }).then(result => {
            console.log(result);
            this.dispatchEvent(changeReviewRaingStateEvent);
        })

        this.editPost = false;
    }

    closeModal() {
        this.editPost = false;
    }

    connectedCallback(){
        if(Id !== null && Id !== undefined){
            if(Id !== "0057S000000bDjTQAU"){
                if(this.post.User__c ===  localStorage.getItem('userId')){
                    this.userPost = true;
                }
                else{
                    this.userPost = false;
                }
            }
        }
    }

}