trigger BookRatingTrigger on Book_Rating__c (before insert, after insert, before update, after update, before delete, after delete) {
    new BookRatingTriggerHandler().run();
}