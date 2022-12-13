@isTest
public class TestDataFactory {
    public static User__c createReaderUser(Boolean doInsert, String nickname, String email, Id SFUserId) {
        User__c user = new User__c(Nickname__c = nickname, Email__c = email, Role__c = 'Czytelnik', SFUser__c = SFUserId);
        if (doInsert) {
            insert user;
        }

        return user;
    }

    public static List<Author__c> createAuthors(Boolean doInsert, Integer count, String name, String surname) {
        List<Author__c> authors = new List<Author__c>();
        for (Integer i = 0; i < count; i++) {
            authors.add(new Author__c(Date_Of_Birth__c = Date.today(), Description__c = 'He lived a long life ' + i, Name__c = name, Surname__c = surname));
        }

        if (doInsert) {
            insert authors;
        }

        return authors;
    }

    public static List<Book__c> createBooks(Boolean doInsert, Integer count, String title, Id authorId) {
        List<Book__c> books = new List<Book__c>();
        for (Integer i = 0; i < count; i++) {
            books.add(new Book__c(Genre__c = 'Fantasy', Title__c = title, Pages__c = 100, Release_Date__c = Date.today(), Author__c = authorId));
        }

        if (doInsert) {
            insert books;
        }

        return books;
    }

    public static Book_Rating__c createBookRating(Boolean doInsert, Id bookId, Id userId, Integer rating) {
        Book_Rating__c bookRating = new Book_Rating__c(Book__c = bookId, Rating__c = rating, User__c = userId);

        if (doInsert) {
            insert bookRating;
        }

        return bookRating;
    }
}