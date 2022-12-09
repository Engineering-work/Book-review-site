public with sharing class BookListController {
    @AuraEnabled
    public static List<Book_List_Item__c> getUserBooks(Id userId) {
        try {
            List<Book_List_Item__c> bookList = [SELECT Book__r.Name, Status__c FROM Book_List_Item__c WHERE User__r.Id = :userId];

            return bookList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
