public class BookRatingTriggerHelper {
    public static void calculateAverageRating(Map<Id, sObject> oldRatings, List<Book_Rating__c> newRatings) {
        Set<Id> bookIds = getBookIds((Map<Id, Book_Rating__c>) oldRatings, newRatings);

        Map<Id, Book__c> idToBook = new Map<Id, Book__c>([SELECT Id, Average_Rating__c, (SELECT Id, Rating__c FROM Book_Ratings__r) FROM Book__c WHERE Id IN :bookIds]);
        Map<Id, List<Book_Rating__c>> bookIdToBookRatings = getBookIdToBookRatings(idToBook);

        for (Id bookId : idToBook.keySet()) {
            Book__c book = idToBook.get(bookId);
            List<Book_Rating__c> bookRatings = bookIdToBookRatings.get(bookId);

            Decimal sum = 0;
            for (Book_Rating__c bookRating : bookRatings) {
                if (newRatings != null) {
                    sum += bookRating.Rating__c;
                }
            }
            book.Average_Rating__c = sum / bookRatings.size();
            idToBook.put(bookId, book);
        }

        updateBooks(idToBook.values());
    }

    public static Map<Id, List<Book_Rating__c>> getBookIdToBookRatings(Map<Id, Book__c> idToBook) {
        Map<Id, List<Book_Rating__c>> bookIdToBookRatings = new Map<Id, List<Book_Rating__c>>();
        for (Book__c book : idToBook.values()) {
            bookIdToBookRatings.put(book.Id, book.Book_Ratings__r);
        }
        return bookIdToBookRatings;
    }

    public static Set<Id> getBookIds(Map<Id, Book_Rating__c> oldRatings, List<Book_Rating__c> newRatings) {
        Set<Id> bookIds = new Set<Id>();
        if (oldRatings != null && newRatings != null) {
            for (Book_Rating__c bookRating : newRatings) {
                if (bookRating.Rating__c != oldRatings.get(bookRating.Id).Rating__c) {
                    bookIds.add(bookRating.Book__c);
                }
            }
        } else if (newRatings != null) {
            for (Book_Rating__c bookRating : newRatings) {
                bookIds.add(bookRating.Book__c);
            }
        } else {
            for (Id bookId : oldRatings.keySet()) {
                bookIds.add(oldRatings.get(bookId).Book__c);
            }
        }

        return bookIds;
    }

    public static void updateBooks(List<Book__c> books) {
        try {
            update books;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
    }
}
