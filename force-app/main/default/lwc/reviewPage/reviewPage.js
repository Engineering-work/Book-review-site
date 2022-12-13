import { LightningElement, wire, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getReviewList from '@salesforce/apex/ReviewController.getAllReviews';
import icons from '@salesforce/resourceUrl/otherImages';



const plus = { icon: icons + '/otherImages/plus.png'}
const minus = {icon: icons + '/otherImages/minus.png'}
// const author = {user_icon: profile1 + '/authorImages/authorImage2.jpg'}

export default class ReviewPage extends  NavigationMixin(LightningElement)  {
    plus = plus
    minus = minus
    bookId = localStorage.getItem('id');
    bookName = localStorage.getItem('bookName');

    @track addReview = false;


    @wire(getReviewList, {bookId: '$bookId'}) 
    reviews

    goToBookDetailsAction(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Szczegoly__c'
            }
        });
    }
    increseLike(){

    }

    increseDislike(){
        
    }

    addReviewAction() {
        this.addReview = true;
    }

    closeModal() {

        this.addReview = false;
    }
}
