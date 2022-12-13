public class BookSuggestionController {
    @AuraEnabled(cacheable=true)
    public static List<Book_Suggestion__c> getUserSuggestion(Id SFUserId) {
        User__c bookwormUser = UserController.getBookwormUser(SFUserId);
        try {
            List<Book_Suggestion__c> bookSuggestions = [
                SELECT Id, Book__c, Book__r.Title__c, Book__r.Author__c, Book__r.Author__r.Name__c, Book__r.Author__r.Surname__c
                FROM Book_Suggestion__c
                WHERE User__r.Id = :bookwormUser.Id
            ];
            return bookSuggestions;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }
}
