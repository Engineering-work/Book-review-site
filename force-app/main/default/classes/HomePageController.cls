public class HomePageController {
    public static List<Book__c> getNewestBooks() {
        return [SELECT Id, Title__c, Author__c, Author__r.Name__c, Author__r.Surname__c, Photo__c, Alt__c FROM Book__c ORDER BY CreatedDate LIMIT 10];
    }

    public static List<Book__c> getBooksByGenre(String genre) {
        return [SELECT Id, Title__c, Genre__c, Author__c, Author__r.Name__c, Author__r.Surname__c, Photo__c, Alt__c FROM Book__c WHERE Genre__c INCLUDES (:genre) LIMIT 10];
    }
}
