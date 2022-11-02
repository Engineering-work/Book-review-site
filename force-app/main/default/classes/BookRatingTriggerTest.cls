@isTest
private class BookRatingTriggerTest {
    @TestSetup
    static void makeData() {
        User__c user = TestDataFactory.createReaderUsers(true, 1, 'Test', 'reader@test.com').get(0);
        Author__c author = TestDataFactory.createAuthors(true, 1, 'Autor', 'Autorski').get(0);
        Book__c book = TestDataFactory.createBooks(true, 1, 'Wiedźmin', author.Id).get(0);
    }

    @isTest
    static void bookRatingInsertTest() {
        Book__c book = [SELECT Id, Average_Rating__c FROM Book__c WHERE Title__c = 'Wiedźmin'].get(0);
        User__c user = [SELECT Id FROM User__c WHERE Nickname__c = 'Test'].get(0);

        Book_Rating__c bookRating = TestDataFactory.createBookRating(false, book.Id, user.Id, 3);
        Test.startTest();
        Database.SaveResult result = Database.insert(bookRating);
        Test.stopTest();

        System.assert(result.isSuccess());
        System.assertEquals(3, [SELECT Id, Average_Rating__c FROM Book__c WHERE Title__c = 'Wiedźmin'].get(0).Average_Rating__c);
    }

    @isTest
    static void bookRatingUpdateTest() {
        Book__c book = [SELECT Id, Average_Rating__c FROM Book__c WHERE Title__c = 'Wiedźmin'].get(0);
        User__c user = [SELECT Id FROM User__c WHERE Nickname__c = 'Test'].get(0);

        Book_Rating__c bookRating = TestDataFactory.createBookRating(true, book.Id, user.Id, 3);
        Test.startTest();
        bookRating.Rating__c = 10;
        Database.SaveResult result = Database.update(bookRating);
        Test.stopTest();

        System.assert(result.isSuccess());
        System.assertEquals(10, [SELECT Id, Average_Rating__c FROM Book__c WHERE Title__c = 'Wiedźmin'].get(0).Average_Rating__c);
    }

    @isTest
    static void bookRatingDeleteTest() {
        Book__c book = [SELECT Id, Average_Rating__c FROM Book__c WHERE Title__c = 'Wiedźmin'].get(0);
        User__c user = [SELECT Id FROM User__c WHERE Nickname__c = 'Test'].get(0);

        Book_Rating__c bookRating = TestDataFactory.createBookRating(true, book.Id, user.Id, 3);
        Test.startTest();
        Database.DeleteResult result = Database.delete(bookRating);
        Test.stopTest();

        System.assert(result.isSuccess());
        System.assertEquals(0, [SELECT Id, Average_Rating__c FROM Book__c WHERE Title__c = 'Wiedźmin'].get(0).Average_Rating__c);
    }
}
