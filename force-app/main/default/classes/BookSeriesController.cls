public class BookSeriesController {
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBooksFromSeries(Id bookSeriesId) {
        try {
            List<Book__c> books = [
                SELECT Id, Title__c, Photo__c, Alt__c, Book_Series__c, Book_Series__r.Name, Author__c, Author__r.Name__c, Author__r.Surname__c
                FROM Book__c
                WHERE Book_Series__c = :bookSeriesId
                ORDER BY CreatedDate
            ];
            return books;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }
}
