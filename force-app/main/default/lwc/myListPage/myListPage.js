import { LightningElement, wire, track } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import BookListObject from "@salesforce/schema/Book_List_Item__c";
import BookStatus from "@salesforce/schema/Book_List_Item__c.Status__c";
const mylist = [
    {   
        id: 0,
        title: 'Lew, czarownica i stara szafa',
        author: 'C.S. Lewis',
        status: 'Chce przeczytać',
    },
    {   
        id: 1,
        title: 'Morderstwo w Orient Express',
        author: 'Agatha Christie',
        status: 'Przeczytane',
    },
    {   
        id: 2,
        title: 'Morderstwo w Orient Express',
        author: 'Agatha Christie',
        status: 'Przeczytane',
    },
    {   
        id: 3,
        title: 'Morderstwo w Orient Express',
        author: 'Agatha Christie',
        status: 'Przeczytane',
    },
    {   
        id: 4,
        title: 'Morderstwo w Orient Express',
        author: 'Agatha Christie',
        status: 'Przeczytane',
    },
    {   
        id: 5,
        title: 'Morderstwo w Orient Express',
        author: 'Agatha Christie',
        status: 'Przeczytane',
    },
    {   
        id: 6,
        title: 'Morderstwo w Orient Express',
        author: 'Agatha Christie',
        status: 'Przeczytane',
    },
    {   
        id: 7,
        title: 'Morderstwo w Orient Express',
        author: 'Agatha Christie',
        status: 'Przeczytane',
    },
    {   
        id: 8,
        title: 'Morderstwo w Orient Express',
        author: 'Agatha Christie',
        status: 'Przeczytane',
    },
    {   
        id: 9,
        title: 'Morderstwo w Orient Express',
        author: 'Agatha Christie',
        status: 'Przeczytane',
    },
    {   
        id: 10,
        title: 'Morderstwo w Orient Express',
        author: 'Agatha Christie',
        status: 'Przeczytane',
    },
    {   
        id: 11,
        title: 'Morderstwo w Orient Express',
        author: 'Agatha Christie',
        status: 'Przeczytane',
    },
    {   
        id: 12,
        title: 'Morderstwo w Orient Express',
        author: 'Agatha Christie',
        status: 'Przeczytane',
    },
    {   
        id: 13,
        title: 'Morderstwo w Orient Express',
        author: 'Agatha Christie',
        status: 'Przeczytane',
    },
    {   
        id: 14,
        title: 'Morderstwo w Orient Express',
        author: 'Agatha Christie',
        status: 'Przeczytane',
    },
    {   
        id: 15,
        title: 'Morderstwo w Orient Express',
        author: 'Agatha Christie',
        status: 'Przeczytane',
    }
]

export default class MyListPage extends LightningElement {

    books = mylist;
    @track isAddBookPopupactive = false;

    @wire(getObjectInfo, {objectApiName: BookListObject}) bookListInfo;

    @wire(getPicklistValues, {recordTypeId: '$bookListInfo.data.defaultRecordTypeId', fieldApiName: BookStatus}) status;

    handleAddBook(event){
        if(this.isAddBookPopupactive === false){
            this.isAddBookPopupactive = true;
        }
    }
    handleispopupactiveChange(event){
        this.isAddBookPopupactive = event.detail;
    }
}