import { LightningElement, wire} from 'lwc';
import getReviewList from '@salesforce/apex/ReviewController.getAllReviews';
// import profile from '@salesforce/resourceUrl/like';
// import profile1 from '@salesforce/resourceUrl/images';


// const plus = { user_icon: profile + '/like/plus.png'}
// const minus = {user_icon: profile + '/like/minus.png'}
// const author = {user_icon: profile1 + '/authorImages/authorImage2.jpg'}

export default class ReviewPage extends LightningElement {
    bookId = 'a053O00000J2A4VQAV';
    // plus = plus
    // minus = minus
    // author = author

    @wire(getReviewList, {bookId: '$bookId'}) 
    reviews

    increseLike(){

    }

    increseDislike(){
        
    }
    

}