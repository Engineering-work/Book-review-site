public class UserTriggerHelper {
    public static void createBookwormUser(Map<Id, sObject> oldUsers, List<User> newUsers) {
        List<User__c> bookwormUsers = new List<User__c>();
        Profile profile = [SELECT Id FROM Profile WHERE Name = 'Bookworm Customers' LIMIT 1];
        for (User user : newUsers) {
            if (user.ProfileId == profile.Id) {
                bookwormUsers.add(new User__c(Nickname__c = user.Username, Email__c = user.Email, Role__c = 'Reader', SFUser__c = user.Id));
            }
        }

        try {
            insert bookwormUsers;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
    }
}