import { LightningElement, wire, track } from 'lwc';
import Id from '@salesforce/user/Id';
import getUserBooks from '@salesforce/apex/BookListController.getUserBooks';
import {refreshApex} from '@salesforce/apex';

export default class MyListPage extends LightningElement {

    books;
    wiredBooks;
    error;
    noBooks;
    @track isAddBookPopupactive = false;

    @wire(getUserBooks, {SFUserId: Id}) books(result){
        this.wiredBooks = result;
        if(result.data){
            this.books = result.data;
            if(this.books.length == 0){
                this.noBooks = true;
            }
            else{
                this.noBooks = false;
            }
        }
        else if(result.error){
            this.error = result.error;
        }
    };

    handleAddBook(){
        if(this.isAddBookPopupactive === false){
            this.isAddBookPopupactive = true;
        }
    }
    handleispopupactiveChange(event){
        this.isAddBookPopupactive = event.detail;
    }
    handleMyListChange(){
        refreshApex(this.wiredBooks);
        if(this.wiredBooks == 0){
            this.noBooks = true;
        }
        else{
            this.noBooks = false;
        }
    }
}