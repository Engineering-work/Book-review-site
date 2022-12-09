public class AuthorController {
    @AuraEnabled(cacheable=true)
    public static Author__c getAuthor(Id authorId) {
        return [SELECT Id, Name__c, Surname__c, Photo__c, Alt__c, Date_Of_Birth__c, Date_Of_Death__c, Description__c FROM Author__c WHERE Id = :authorId LIMIT 1];
    }

    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBooksByAuthor(Id authorId) {
        return [SELECT Id, Title__c, Author__c, Author__r.Name__c, Author__r.Surname__c, Photo__c, Alt__c FROM Book__c WHERE Author__c = :authorId];
    }
}
