public class BookRatingTriggerHandler extends TriggerHandler {
    private void processBeforeInsert() {
    }

    private void processAfterInsert() {
        BookRatingTriggerHelper.calculateAverageRating(null, Trigger.new);
    }

    private void processBeforeUpdate() {
    }

    private void processAfterUpdate() {
        BookRatingTriggerHelper.calculateAverageRating(Trigger.oldMap, Trigger.new);
    }

    private void processBeforeDelete() {
        BookRatingTriggerHelper.calculateAverageRating(Trigger.oldMap, null);
    }

    private void processAfterDelete() {
    }
}