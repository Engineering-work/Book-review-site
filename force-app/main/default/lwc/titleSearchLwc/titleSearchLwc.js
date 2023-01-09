import { LightningElement, api, track } from 'lwc';
import findTitles from "@salesforce/apex/findTitles.findTitles";
export default class TitleSearchLwc extends LightningElement {

 @track recordsList;
 @track searchKey = "";
 @api selectedValue;
 @api selectedRecordId;
 @api iconName;
 @track message;


 onLeave(event){
    setTimeout(() => {
        this.searchKey = '';
        this.recordsList = null;
    }, 300);
 }
 handleKeyChange(event) {
  const searchKey = event.target.value;
  this.searchKey = searchKey;
  this.getLookupResult();
 }
 removeRecordOnLookup(event) {
  this.searchKey = "";
  this.selectedValue = null;
  this.selectedRecordId = null;
  this.recordsList = null;
  this.onSeletedRecordUpdate();
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
onRecordSelection(event) {
  this.selectedRecordId = event.target.dataset.key;
  this.selectedValue = event.target.dataset.name;
  this.searchKey = "";
  this.onSeletedRecordUpdate();
 }
onSeletedRecordUpdate(){
    const passEventr = new CustomEvent('titleselection', {
      detail: { selectedBookId: this.selectedRecordId, selectedTitle: this.selectedValue }
     });
     this.dispatchEvent(passEventr);
   }
}