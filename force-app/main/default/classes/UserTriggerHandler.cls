public class UserTriggerHandler extends TriggerHandler {
    private void processBeforeInsert() {
    }

    private void processAfterInsert() {
        UserTriggerHelper.createBookwormUser(null, Trigger.new);
    }

    private void processBeforeUpdate() {
    }

    private void processAfterUpdate() {
    }

    private void processBeforeDelete() {
    }

    private void processAfterDelete() {
    }
}
