import { LightningElement, api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class DiscussionContainer extends NavigationMixin(LightningElement) {
    @api discussion;
    
    goToPostsAction(){
        localStorage.setItem('discussionId', this.discussion.Id);

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Posty__c'
            }
        });
    }


}