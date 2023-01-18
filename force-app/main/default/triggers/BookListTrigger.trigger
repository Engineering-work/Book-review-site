trigger BookListTrigger on Book_List_Item__c(before insert, after insert, before update, after update, before delete, after delete) {
    new BookListTriggerHandler().run();
}
