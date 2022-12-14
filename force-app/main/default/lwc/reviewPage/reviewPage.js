import { LightningElement, wire, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import getReviewList from '@salesforce/apex/ReviewController.getAllReviews';
import addReview from '@salesforce/apex/ReviewController.addReview';
import getBookwormUser from '@salesforce/apex/UserController.getBookwormUser';
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
    reviewsEmpty = false;
    @wire(getBookwormUser, {SFUserId: Id}) 
    bookwormUserId;

    @wire(getReviewList, {bookId: '$bookId'}) reviews(result){
        this.wiredReviews = result;
        if(result.data){
            this.reviews = result.data;
            if(result.data.length ===0){
            this.reviewsEmpty = true;
            }
            if(this.bookwormUserId.data.Role__c !== "Recenzent"){
                this.loggedInUser = false;
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
        console.log(this.bookId)
        console.log(this.bookId)
        console.log(this.bookId)

        addReview({bookId: this.bookId, 
            bookwormUserId: this.bookwormUserId.data.Id, 
            content: this.reviewContent
        }).then(result => {
            console.log(result)
            refreshApex(this.wiredReviews);
        })
            this.closeModal();
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
            if(this.userId !== "0057S000000bDjTQAU"){
                
                this.loggedInUser = true;
                console.log('userId'+' '+this.userId);
            }
            else{
                this.loggedInUser = false;
            }
        }
}
}