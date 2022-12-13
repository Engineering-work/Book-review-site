public with sharing class findTitles {
    @AuraEnabled(cacheable=true)
    public static List<sobject> findTitles(String searchKey){
        try {
            String searchText = String.escapeSingleQuotes(searchKey) + '%';
            List<Book__c> bookList = [SELECT Id,Title__c FROM Book__c WHERE Title__c LIKE :searchText LIMIT 6];
            return bookList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
