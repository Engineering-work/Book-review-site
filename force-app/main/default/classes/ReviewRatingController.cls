public class ReviewRatingController {
    @AuraEnabled
    public static Review_Rating__c addReviewRating(Id reviewId, Id bookwormUserId, Boolean isLike) {
        Review_Rating__c reviewRating = new Review_Rating__c(Review__c = reviewId, Like__c = isLike, User__c = bookwormUserId);
        try {
            insert reviewRating;
            return reviewRating;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }

    @AuraEnabled(cacheable=true)
    public static Review_Rating__c userHasRatingReview(Review__c review, Id bookwormUserId) {
    List<Review_Rating__c> reviewRating = [SELECT Id, Like__c, User__c, Review__c FROM Review_Rating__c WHERE Review__c = :review.Id AND User__c = :bookwormUserId LIMIT 1];
        if(reviewRating.size() > 0){
            return reviewRating[0];
        }
        else{
            return null;
        }
        

    }

    @AuraEnabled
    public static Review_Rating__c changeReviewRating(Review_Rating__c reviewRating, Boolean isLike) {
        reviewRating.Like__c = isLike;
        try {
            update reviewRating;
            return reviewRating;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }

    @AuraEnabled
    public static Review_Rating__c deleteReviewRating(Review_Rating__c reviewRating) {
        try {
            delete reviewRating;
            return reviewRating;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }
}
