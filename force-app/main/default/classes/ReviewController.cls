public with sharing class ReviewController {
    @AuraEnabled(cacheable=true)
    public static List<Review__c> getAllReviews(id bookId){
        try {
            List<Review__c> reviews = [SELECT Book__r.Title__c, Content__c, Dislikes__c, Likes__c, User__r.Nickname__c, CreatedDate  FROM Review__c WHERE Book__r.Id =: bookId];
            return reviews;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

   
}