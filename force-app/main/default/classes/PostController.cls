public with sharing class PostController {
    @AuraEnabled(cacheable=true)
    public static List<Post__c> getAllPosts(id discussionId){
        try {
            List<Post__c> posts = [SELECT Id, User__r.Nickname__c, User__r.Photo__c, CreatedDate, Content__c  FROM Post__c WHERE Discussion__r.Id =: discussionId];
            return posts;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Post__c createPost(String content, id userId, id discussionId){
        Post__c newPost = new Post__c(Content__c = content, User__c = userId, Discussion__c = discussionId);
        try {
           
            insert newPost;
            return newPost;
            
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        System.debug('jakas wiadomosc');
        return null;
    }

    @AuraEnabled
    public static Post__c updatePost(Post__c post, String content) {
        post.Content__c = content;
        try {
            update post;
            return post;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }

    @AuraEnabled
    public static Post__c deletePost(Post__c post) {
        try {
            delete post;
            return post;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }
}