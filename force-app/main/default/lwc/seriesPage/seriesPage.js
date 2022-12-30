import { LightningElement } from 'lwc';
import getBooksFromSeries from '@salesforce/apex/BookSeriesController.getBooksFromSeries';

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