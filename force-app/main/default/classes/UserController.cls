public with sharing class UserController {
    @AuraEnabled(cacheable=true)
    public static User__c getBookwormUser(Id SFUserId) {
        return [SELECT Id, Alt__c, Email__c, Nickname__c, SFUser__c, Photo__c, Role__c FROM User__c WHERE SFUser__c = :SFUserId LIMIT 1];
    }
}
