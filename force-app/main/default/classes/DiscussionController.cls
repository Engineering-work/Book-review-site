public with sharing class DiscussionController {
    @AuraEnabled(cacheable=true)
    public static Discussion__c getDiscussion(id discussionId){
        try {
            Discussion__c discussion = [SELECT User__r.SFUser__c, Book__r.Title__c, User__r.Photo__c,Post_Number__c, Title__c,CreatedDate, User__r.Nickname__c,  First_Post__c FROM Discussion__c WHERE Id =:discussionId LIMIT 1];
            System.debug(discussion);
            return discussion;
         
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }

    @AuraEnabled(cacheable=true)
    public static Discussion__c userHasDiscussion(Id SFuserId, id bookId) {
        List<Discussion__c> allDiscussions = getAllDiscussions(bookId);
        for (Discussion__c discussion : allDiscussions) {
            if (discussion.User__r.SFUser__c == SFuserId) {
                return discussion;
            }
        }
        return null;
    }

    @AuraEnabled(cacheable=true)
    public static List<Discussion__c> getAllDiscussions(id bookId){
        try {
            List<Discussion__c> discussions = [SELECT User__r.SFUser__c, Book__r.Title__c, Post_Number__c, Title__c,CreatedDate, User__r.Nickname__c, User__r.Photo__c FROM Discussion__c WHERE Book__r.Id =: bookId];
            return discussions;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Discussion__c addNewDiscussion(String title, String firstPost, id userId, id bookId){
        Discussion__c newDiscussion = new Discussion__c(Title__c = title, First_Post__c = firstPost, User__c = userId, Book__c = bookId);
        try {
            insert newDiscussion;
            return newDiscussion;
            
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }
    @AuraEnabled
    public static Discussion__c updateDiscussion(Discussion__c discussion, String post) {
        discussion.First_Post__c = post;
        try {
            update discussion;
            return discussion;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }

    @AuraEnabled
    public static Discussion__c deleteDiscussion(Discussion__c discussion) {
        try {
            delete discussion;
            return discussion;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }
   
}