public class ReviewController {
    @AuraEnabled(cacheable=true)
    public static List<Review__c> getAllReviews(Id bookId) {
        return [
            SELECT Id, Book__c, Book__r.Title__c, Content__c, Dislikes__c, Likes__c,User__r.SFUser__c, User__r.Nickname__c, User__r.Photo__c, User__r.Alt__c, CreatedDate
            FROM Review__c
            WHERE Book__c = :bookId
        ];
    }

    @AuraEnabled(cacheable=true)
    public static Boolean isUserReviewer(User__c bookwormUser) {
        if (bookwormUser.Role__c == 'Recenzent') {
            return true;
        } else {
            return false;
        }
    }

    @AuraEnabled(cacheable=true)
    public static Review__c userHasReview(Id bookId,Id SFuserId) {
        List<Review__c> reviews = getAllReviews(bookId);
        for (Review__c review : reviews) {
            if (review.User__r.SFUser__c == SFuserId) {
                return review;
            }
        }
        return null;
    }

    @AuraEnabled
    public static Review__c addReview(Id bookId, Id bookwormUserId, String content) {
        Review__c review = new Review__c(Book__c = bookId, Content__c = content, Date__c = Date.today(), User__c = bookwormUserId);
        try {
            insert review;
            return review;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }

    @AuraEnabled(cacheable=true)
    public static Review__c editReview(Review__c review, String content) {
        review.Content__c = content;

        try {
            update review;
            return review;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }

    @AuraEnabled(cacheable=true)
    public static Review__c deleteReview(Review__c review) {
        try {
            delete review;
            return review;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }
}
