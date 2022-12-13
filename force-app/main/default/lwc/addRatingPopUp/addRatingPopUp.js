import { LightningElement, api, wire } from 'lwc';
import {refreshApex} from '@salesforce/apex';
import Id from '@salesforce/user/Id';
import userHasBookRating from '@salesforce/apex/BookRatingController.userHasBookRating';
import getBookwormUser from '@salesforce/apex/UserController.getBookwormUser';
import addBookRating from '@salesforce/apex/BookRatingController.addBookRating';
import editBookRating from '@salesforce/apex/BookRatingController.editBookRating';
import deleteBookRating from '@salesforce/apex/BookRatingController.deleteBookRating';

export default class AddRatingPopUp extends LightningElement {
    @api ispopupactive;
    profile;
    bookId;
    loggedInUser;
    userrating;
    userHasRating;
    wiredUserRating;

    @wire(userHasBookRating, {bookId: localStorage.getItem('bookid'), SFuserId: Id}) userRating(result){
        this.wiredUserRating = result;
        if(result.data){
            this.userrating = result.data;
            this.userHasRating = true;
        }
        else if(result == null){
            this.userHasRating = false;
        }
        else if(result.error){
            this.error = result.error;
            this.userHasRating = false;
        }
    };

    closeModal(){
        this.ispopupactive = false;
        const changePopupStateEvent = new CustomEvent("ispopupactivechange", {
            detail: this.ispopupactive
        });
          
        this.dispatchEvent(changePopupStateEvent);
    }

    addRating(){
        let ratingNumber = this.template.querySelector(`lightning-slider`);
        let comment = this.template.querySelector(`lightning-textarea`);
        if(comment == undefined){
            comment = 'undefined';
        }
        addBookRating({
            bookId: localStorage.getItem('bookid'), 
            bookwormUserId: this.profile.Id,
            comment: comment.value,
            rating: ratingNumber.value
        }).then(rating => {
            console.log(rating);
            this.closeModal();
            refreshApex(this.wiredUserRating);
            const updateRatingEvent = new CustomEvent("ratingchange", {});
            this.dispatchEvent(updateRatingEvent);
        })
    }

    editRatingData(){
        let ratingNumber = this.template.querySelector(`lightning-slider`);
        let comment = this.template.querySelector(`lightning-textarea`);
        if(comment == undefined){
            comment = 'undefined';
        }
        editBookRating({
            bookId: localStorage.getItem('bookid'), 
            SFuserId: Id,
            comment: comment.value,
            rating: ratingNumber.value
        }).then(rating => {
            console.log(rating);
            this.closeModal();
            refreshApex(this.wiredUserRating);
            const updateRatingEvent = new CustomEvent("ratingchange", {});
            this.dispatchEvent(updateRatingEvent);
        })
    }

    deleteRatingData(){
        deleteBookRating({
            bookId: localStorage.getItem('bookid'), 
            SFuserId: Id
        }).then(rating => {
            console.log(rating);
            this.closeModal();
            refreshApex(this.wiredUserRating);
            const updateRatingEvent = new CustomEvent("ratingchange", {});
            this.dispatchEvent(updateRatingEvent);
        })
    }

    connectedCallback(){
        if(Id !== null && Id !== undefined){
            if(Id !== "0057S000000bDjTQAU"){
                this.loggedInUser = true;
                getBookwormUser({
                    SFUserId: Id
                }).then(user => {
                    this.profile = user;
                })
            }
            else{
                this.loggedInUser = false;
            }
        }
        else{
            this.loggedInUser = false;
        }
    }
}