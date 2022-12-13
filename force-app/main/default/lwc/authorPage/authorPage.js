import { LightningElement } from 'lwc';

import getAuthor from '@salesforce/apex/AuthorController.getAuthor';
import getBooksByAuthor from '@salesforce/apex/AuthorController.getBooksByAuthor';

export default class AuthorPage extends LightningElement {
    author;
    booksByAuthor;

    connectedCallback(){
        let authorid = localStorage.getItem('authorid');
        getAuthor({
            authorId: authorid
        }).then(author => {
            this.author = author;
        })

        getBooksByAuthor({
            authorId: authorid
        }).then(booksByAuthor => {
            this.booksByAuthor = booksByAuthor;
            console.log(this.booksByAuthor);
        })
    }
}