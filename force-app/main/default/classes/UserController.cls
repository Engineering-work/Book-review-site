public class UserController {
    @AuraEnabled(cacheable=true)
    public static User__c getBookwormUser(Id SFUserId) {
        return [SELECT Id, Alt__c, Email__c, Nickname__c, SFUser__c, Photo__c, Role__c FROM User__c WHERE SFUser__c = :SFUserId LIMIT 1];
    }

    @AuraEnabled(cacheable=true)
    public static User__c changeNickname(User__c bookwormUser, String nickname) {
        bookwormUser.Nickname__c = nickname;
        try {
            update bookwormUser;
            return bookwormUser;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }
}
