public with sharing class PostController {
    @AuraEnabled(cacheable=true)
    public static List<Post__c> getAllPosts(id discussionId){
        try {
            List<Post__c> posts = [SELECT User__r.Nickname__c, User__r.Photo__c, CreatedDate, Content__c  FROM Post__c WHERE Discussion__r.Id =: discussionId];
            return posts;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static Post__c createPost(String name, String content, id userId, id discussionId){
        Post__c newPost = new Post__c(Name=name, Content__c = content, User__c = userId, Discussion__c = discussionId);
        try {
           
            insert newPost;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        System.debug('jakas wiadomosc');
        return newPost;
    }
}