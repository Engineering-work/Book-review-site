public abstract class TriggerHandler {
    public void run() {
        if (Trigger.isInsert && Trigger.isBefore) {
            processBeforeInsert();
        }
        if (Trigger.isInsert && Trigger.isAfter) {
            processAfterInsert();
        }
        if (Trigger.isUpdate && Trigger.isBefore) {
            processBeforeUpdate();
        }
        if (Trigger.isUpdate && Trigger.isAfter) {
            processAfterUpdate();
        }
        if (Trigger.isDelete && Trigger.isBefore) {
            processBeforeDelete();
        }
        if (Trigger.isDelete && Trigger.isAfter) {
            processAfterDelete();
        }
    }

    abstract private void processBeforeInsert();
    abstract private void processAfterInsert();
    abstract private void processBeforeUpdate();
    abstract private void processAfterUpdate();
    abstract private void processBeforeDelete();
    abstract private void processAfterDelete();
}
