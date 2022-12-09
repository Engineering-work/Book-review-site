public with sharing class BookController {
    @AuraEnabled(cacheable=true)
    public static Book__c getBook(String bookId){
        try {
            Book__c book = [SELECT Genre__c, Title__c, Pages__c, Release_Date__c, 
            Book_Series__r.Id, Book_Series__r.Name, Author__r.Id, Author__r.Name, Photo__c, Average_Rating__c, Alt__c, Publishing_House__c FROM Book__c WHERE Id =: bookId];
          
            return book;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getAllBooks(){
        try {
            List<Book__c> books = [SELECT Genre__c, Title__c, Pages__c, Release_Date__c, 
            Book_Series__r.Id, Book_Series__r.Name, Author__r.Id, Author__r.Name, Photo__c, Average_Rating__c FROM Book__c];
           
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
           
            return books;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getAllBooksToRanking(){
        try {
            List<Book__c> books = [SELECT Genre__c, Title__c, Pages__c, Release_Date__c, 
            Book_Series__r.Id, Book_Series__r.Name, Author__r.Id, Author__r.Name, Photo__c, Average_Rating__c FROM Book__c ORDER BY Average_Rating__c  DESC NULLS LAST LIMIT 20];
    
            
            return books;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}