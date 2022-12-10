public with sharing class BookListController {
    @AuraEnabled(cacheable=true)
    public static List<Book_List_Item__c> getUserBooks(Id bookwormUserId) {
        try {
            List<Book_List_Item__c> bookList = [
                SELECT Id, Book__c, Book__r.Title__c, Book__r.Author__c, Book__r.Author__r.Name__c, Book__r.Author__r.Surname__c, Status__c
                FROM Book_List_Item__c
                WHERE User__r.Id = :bookwormUserId
            ];
            return bookList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
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

    @AuraEnabled(cacheable=true)
    public static Book_List_Item__c changeBookListItemStatus(Book_List_Item__c bookListItem, String newStatus) {
        bookListItem.Status__c = newStatus;

        try {
            update bookListItem;
            return bookListItem;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }

    @AuraEnabled(cacheable=true)
    public static Book_List_Item__c deleteBookListItem(Book_List_Item__c bookListItem) {
        try {
            delete bookListItem;
            return bookListItem;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }
}
