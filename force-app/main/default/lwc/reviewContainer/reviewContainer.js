import { LightningElement, api, wire} from 'lwc';
import addReviewRating from '@salesforce/apex/ReviewRatingController.addReviewRating';
import userHasRatingReview from '@salesforce/apex/ReviewRatingController.userHasRatingReview';
import changeReviewRating from '@salesforce/apex/ReviewRatingController.changeReviewRating';
import deleteReviewRating from '@salesforce/apex/ReviewRatingController.deleteReviewRating';
import icons from '@salesforce/resourceUrl/otherImages';

import getBookwormUser from '@salesforce/apex/UserController.getBookwormUser';
import Id from '@salesforce/user/Id';
import {refreshApex} from '@salesforce/apex';

const plus = { icon: icons + '/otherImages/plus.png'}
const minus = {icon: icons + '/otherImages/minus.png'}

export default class ReviewContainer extends LightningElement {
    @api review;
    plus = plus
    minus = minus
    like = null;
    reviewRatingLike = null
    reviewRatingId = null
    loggedInUser = false
    wiredReview;
    actuallyReview

    @wire(getBookwormUser, {SFUserId: Id}) 
    bookwormUserId;

    increseLike(){
        console.log(this.review)
        const changeReviewRaingStateEvent = new CustomEvent("changereviewstate", {
        });
        userHasRatingReview({review: this.review, bookwormUserId: this.bookwormUserId.data.Id}).then
            (result =>{
                if(result == null){
                    this.like = true
                    addReviewRating({reviewId: this.review.Id, 
                        bookwormUserId: this.bookwormUserId.data.Id, 
                        isLike: this.like
                    }).then(result => {
                       console.log(result);
                       this.dispatchEvent(changeReviewRaingStateEvent);
                    })
                }else{
                this.reviewRatingLike = result.Like__c;
                this.reviewRatingId = result.Id;
                if(this.reviewRatingLike == true){
                    deleteReviewRating({
                        reviewRating: result
                    }).then
                    (result =>{
                        console.log(result)
                        this.dispatchEvent(changeReviewRaingStateEvent);
                    })
                    }
                    else{
                        console.log('zmien')
                        changeReviewRating({
                            reviewRating: result,
                            isLike: true
                        }).then(result =>{
                            console.log(result)
                            this.dispatchEvent(changeReviewRaingStateEvent);
                        })
        
                    }
                }
            })
          
    }

    increseDislike(){
        console.log(this.review)
        const changeReviewRaingStateEvent = new CustomEvent("changereviewstate", {
        });
        userHasRatingReview({
            review: this.review, 
            bookwormUserId: this.bookwormUserId.data.Id
        }).then(result =>{
            if(result == null){
                this.like = false
                addReviewRating({reviewId: this.review.Id, 
                    bookwormUserId: this.bookwormUserId.data.Id, 
                    isLike: this.like
                }).then(result => {
                    console.log(result)
                    this.dispatchEvent(changeReviewRaingStateEvent);
                })
            }else{
                this.reviewRatingLike = result.Like__c;
                this.reviewRatingId = result.Id;
                if(this.reviewRatingLike == false){
                    deleteReviewRating({
                        reviewRating: result
                    }).then
                    (result =>{
                        console.log(result)
                        this.dispatchEvent(changeReviewRaingStateEvent);
                    })
                }
                else{
                    changeReviewRating({
                        reviewRating: result,
                        isLike: false
                    }).then(result =>{
                        console.log(result)
                        this.dispatchEvent(changeReviewRaingStateEvent);
                    })
        
                }
            }
        })
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