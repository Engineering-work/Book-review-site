public class BookListTriggerHandler extends TriggerHandler {
    private void processBeforeInsert() {
    }

    private void processAfterInsert() {
        BookListTriggerHelper.addSimilarBooks(Trigger.new);
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
