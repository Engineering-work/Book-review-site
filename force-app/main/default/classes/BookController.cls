public with sharing class BookController {
    @AuraEnabled
    public static Book__c getBook(id bookId){
        try {
            Book__c book = [SELECT Genre__c, Title__c, Pages__c, Release_Date__c, 
            Book_Series__r.Id, Book_Series__r.Name, Author__r.Id, Author__r.Name, Photo__c, Average_Rating__c FROM Book__c WHERE Id =: bookId];
            System.debug(book);
            return book;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Book__c> getAllBooks(){
        try {
            List<Book__c> books = [SELECT Genre__c, Title__c, Pages__c, Release_Date__c, 
            Book_Series__r.Id, Book_Series__r.Name, Author__r.Id, Author__r.Name, Photo__c, Average_Rating__c FROM Book__c];
            System.debug(books);
            return books;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Book__c> getAllBooksByGenre(String genre){
        try {
            List<Book__c> books = [SELECT Genre__c, Title__c, Pages__c, Release_Date__c, 
            Book_Series__r.Id, Book_Series__r.Name, Author__r.Id, Author__r.Name, Photo__c, Average_Rating__c FROM Book__c 
            WHERE Genre__c INCLUDES(:genre)];
            System.debug(books.size());
            return books;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Book__c> getAllBooksToRanking(){
        try {
            List<Book__c> books = [SELECT Genre__c, Title__c, Pages__c, Release_Date__c, 
            Book_Series__r.Id, Book_Series__r.Name, Author__r.Id, Author__r.Name, Photo__c, Average_Rating__c FROM Book__c ORDER BY Average_Rating__c  DESC NULLS LAST LIMIT 20];
    
            for (Book__c el : books) {
                System.debug(el.Average_Rating__c);
            }
            return books;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}


        // List<Book__c>  newBooks = new List<Book__c>();

            // Map<Double, Book__c> ratingWithBookMap = new Map<Double, Book__c>();
            // for (Book__c el : books) {
            //     ratingWithBookMap.put(el.Average_Rating__c, el);
            // }


            // for (Book__c el : books) {
                
            // }

            // System.debug('-----------------');
            // books.sort();