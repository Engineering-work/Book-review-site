import { LightningElement, wire, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import getReviewList from '@salesforce/apex/ReviewController.getAllReviews';
import addReview from '@salesforce/apex/ReviewController.addReview';
import getBookwormUser from '@salesforce/apex/UserController.getBookwormUser';
import editReview from '@salesforce/apex/ReviewController.editReview';
import deleteReview from '@salesforce/apex/ReviewController.deleteReview';
import userHasReview from '@salesforce/apex/ReviewController.userHasReview';

import Id from '@salesforce/user/Id';
import {refreshApex} from '@salesforce/apex';

export default class ReviewPage extends  NavigationMixin(LightningElement)  {
    bookId = localStorage.getItem('bookid');
    bookName = localStorage.getItem('bookName');
    @track addReview = false;
    reviews;
    wiredReviews;
    reviewContent = null;
    loggedInUser = false
    reviewsEmpty;
    userId;
    bookwormUser;
    thisReview;

    @wire(getReviewList, {bookId: '$bookId'}) reviews(result){
        this.wiredReviews = result;
        if(result.data){
            this.reviews = result.data;
            if(this.bookwormUser.Role__c !== "Recenzent"){
                this.loggedInUser = false;
            }
            if(result.data.length===0){
                this.reviewsEmpty = true;
            }
            else{
                this.reviewsEmpty = false;
            }
        }
        else if(result.error){
            this.error = result.error;
        }
    };

    addReviewAction() {
        this.addReview = true;
    }

    changeReview(event){
        this.reviewContent = event.target.value;
    }

    addReviewRecord(){

        addReview({bookId: this.bookId, 
            bookwormUserId: this.bookwormUser.Id, 
            content: this.reviewContent
        }).then(result => {
            console.log(result)
            refreshApex(this.wiredReviews);
            this.thisReview = result
        })
        this.closeModal();
    }

    editReviewRecord() {
        editReview({
            review: this.thisReview,
            content: this.reviewContent})
            .then(result=>{
                console.log(result)
                refreshApex(this.wiredReviews);
            })
        this.addReview = false;
    }

    deleteReviewRecord() {

        deleteReview({
            review: this.thisReview})
            .then(result=>{
                console.log(result)
                refreshApex(this.wiredReviews);
            })
        this.thisReview = false;
        this.addReview = false;
    }

    closeModal() {

        this.addReview = false;
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
        refreshApex(this.wiredReviews);
    }

    connectedCallback(){
        if(Id !== null && Id !== undefined){
            if(Id !== "0057S000000bDjTQAU"){
                this.loggedInUser = true;
                getBookwormUser({
                    SFUserId: Id
                }).then(user => {
                    this.bookwormUser = user;
                })
            }
            else{
                this.loggedInUser = false;
            }
        }
        userHasReview({
            bookId: this.bookId,
            SFuserId: Id
            }).then(hasReview =>{
                this.thisReview= hasReview;
            })
}
}