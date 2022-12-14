import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import findTitles from "@salesforce/apex/findTitles.findTitles";

export default class TitleSearchNavigationLwc extends NavigationMixin(LightningElement) {

    
 @track recordsList;
 @track searchKey = "";
 @api selectedRecordId;
 @api iconName;
 @track message;


 onLeave(event){
    setTimeout(() => {
        this.searchKey = '';
        this.recordsList = null;
    }, 300);
 }

 onRecordSelection(event) {
  this.selectedRecordId = event.target.dataset.key;
  this.searchKey = "";
  localStorage.setItem('bookid', event.target.dataset.key);
    this[NavigationMixin.Navigate]({
        type: 'comm__namedPage',
        attributes: {
            name: 'Szczegoly__c'
        }
    });
 }
 handleKeyChange(event) {
  const searchKey = event.target.value;
  this.searchKey = searchKey;
  this.getLookupResult();
 }

getLookupResult() {
findTitles({ searchKey: this.searchKey })
     .then((result) => {
      if (result.length===0) {
        this.recordsList = [];
        this.message = "Nie znaleziono rekordów";
       } else {
        this.recordsList = result;
        this.message = "";
       }
       this.error = undefined;
     })
     .catch((error) => {
      this.error = error;
      this.recordsList = undefined;
     });
}
}