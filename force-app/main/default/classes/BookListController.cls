public with sharing class BookListController {
    @AuraEnabled(cacheable=true)
    public static List<Book_List_Item__c> getUserBooks(Id SFUserId) {
        try {

            User__c bookwormUser = [SELECT Id, Alt__c, Email__c, Nickname__c, SFUser__c, Photo__c, Role__c FROM User__c WHERE SFUser__c = :SFUserId LIMIT 1];
            Id bookwormUserId = bookwormUser.Id;

            List<Book_List_Item__c> bookList = [
                SELECT Id, User__c,Book__c, Book__r.Title__c, Book__r.Author__c, Book__r.Author__r.Name__c, Book__r.Author__r.Surname__c, Status__c
                FROM Book_List_Item__c
                WHERE User__c =:bookwormUserId
            ];
            return bookList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Book_List_Item__c addBookListItem(Id bookId, Id bookwormUserId, String status) {
        Book_List_Item__c bookListItem;
        if (status == null || status == '') {
            bookListItem = new Book_List_Item__c(Book__c = bookId, User__c = bookwormUserId);
        } else {
            bookListItem = new Book_List_Item__c(Book__c = bookId, User__c = bookwormUserId, Status__c = status);
        }

        try {
            insert bookListItem;
            return bookListItem;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }

    @AuraEnabled
    public static Book_List_Item__c changeBookListItemStatus(Id bookListItemId, String newStatus) {
        Book_List_Item__c bookListItem = [SELECT Id, Status__c FROM Book_List_Item__c WHERE Id =:bookListItemId];

        bookListItem.Status__c = newStatus;

        try {
            update bookListItem;
            return bookListItem;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }

    @AuraEnabled
    public static String deleteBookListItem(Id bookListItemId) {
        Book_List_Item__c bookListItem = [SELECT Id, Status__c FROM Book_List_Item__c WHERE Id =:bookListItemId];

        try {
            delete bookListItem;
            return 'Record successfully deleted';
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }
}
