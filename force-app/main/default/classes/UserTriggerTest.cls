@isTest
private class UserTriggerTest {
    @TestSetup
    static void makeData() {
        UserRole portalRole = [SELECT Id FROM UserRole WHERE Name = 'Bookworm Customer Manager' LIMIT 1];
        Profile sysAdminProfile = [SELECT Id FROM Profile WHERE name = 'System Administrator'];
        User portalAccountOwner = new User(
            UserRoleId = portalRole.Id,
            ProfileId = sysAdminProfile.Id,
            Username = System.now().millisecond() + 'test2@test.com',
            Alias = 'batman',
            Email = 'bruce.wayne@wayneenterprises.com',
            EmailEncodingKey = 'UTF-8',
            Firstname = 'Bruce',
            Lastname = 'Wayne',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            TimeZoneSidKey = 'America/Chicago'
        );
        Database.insert(portalAccountOwner);
    }
    @isTest
    static void userInsertTest() {
        User userPortalOwner = [SELECT Id FROM User WHERE Email = 'bruce.wayne@wayneenterprises.com'];

        System.runAs(userPortalOwner) {
            Account portalAccount = new Account(Name = 'TestAccount', OwnerId = userPortalOwner.Id);
            Database.insert(portalAccount);

            Contact contact = new Contact(FirstName = 'Test', Lastname = 'McTesty', AccountId = portalAccount.Id, Email = System.now().millisecond() + 'test@test.com');
            Database.insert(contact);

            Profile profileId = [SELECT Id FROM Profile WHERE Name = 'Bookworm Customers' LIMIT 1];
            User user = new User(
                LastName = 'Doe',
                FirstName = 'John',
                Alias = 'jdoe',
                Email = 'john.doe@mail.com',
                Username = 'john.doe@mail.com',
                ContactId = contact.Id,
                ProfileId = profileId.id,
                TimeZoneSidKey = 'GMT',
                LanguageLocaleKey = 'en_US',
                EmailEncodingKey = 'UTF-8',
                LocaleSidKey = 'en_US'
            );

            Test.startTest();
            insert user;
            Test.stopTest();

            User__c bookwormUser = [SELECT Id, Nickname__c, Email__c, User__c FROM User__c WHERE User__c = :user.Id].get(0);
            System.assertEquals(user.Email, bookwormUser.Email__c);
            System.assertEquals(user.Username, bookwormUser.Nickname__c);
            System.assertEquals(user.Id, bookwormUser.User__c);
        }

    }
}