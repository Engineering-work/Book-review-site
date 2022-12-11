import { LightningElement } from 'lwc';

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

    seriesBooks = seriesBooks;

}