import { LightningElement } from 'lwc';
import getBooksFromSeries from '@salesforce/apex/BookSeriesController.getBooksFromSeries';

const seriesBooks = [
    {
        id: 0,
        name: 'wiedzmin',
        Title__c: 'acv',
        Author__r: {
            Name__c: 'asdasf',
        },
        Photo__c: 'sdfsdf.jpg'
    }
]

export default class SeriesPage extends LightningElement {
    seriesid = localStorage.getItem('seriesid');

    seriesBooks;

    connectedCallback(){
        let bookSeriesId = localStorage.getItem('seriesid');
        getBooksFromSeries({
            bookSeriesId: bookSeriesId
        }).then(series => {
            this.seriesBooks = series;
        })
    }
}