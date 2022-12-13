public class BookRatingController {
    @AuraEnabled(cacheable=true)
    public static List<Book_Rating__c> getBookRatings(Id bookId) {
        return [
            SELECT Id, Book__c, Comment__c, Rating__c, CreatedDate, User__c, User__r.SFUser__c, User__r.Photo__c, User__r.Alt__c, User__r.Nickname__c
            FROM Book_Rating__c
            WHERE Book__c = :bookId
        ];
    }

    @AuraEnabled(cacheable=true)
    public static Book_Rating__c userHasBookRating(List<Book_Rating__c> bookRatings, Id SFuserId) {
        for (Book_Rating__c bookRating : bookRatings) {
            if (bookRating.User__r.SFUser__c == SFuserId) {
                return bookRating;
            }
        }
        return null;
    }

    @AuraEnabled(cacheable=true)
    public static Book_Rating__c addBookRating(Id bookId, Id bookwormUserId, String comment, Decimal rating) {
        Book_Rating__c bookRating = new Book_Rating__c(Book__c = bookId, Rating__c = rating, Comment__c = comment, User__c = bookwormUserId);

        try {
            insert bookRating;
            return bookRating;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }

    @AuraEnabled(cacheable=true)
    public static Book_Rating__c editBookRating(Book_Rating__c oldRating, String comment, Decimal rating) {
        oldRating.Comment__c = comment;
        oldRating.Rating__c = rating;

        try {
            update oldRating;
            return oldRating;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }

    @AuraEnabled(cacheable=true)
    public static Book_Rating__c deleteBookRating(Book_Rating__c bookRating) {
        try {
            delete bookRating;
            return bookRating;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }
}
