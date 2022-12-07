import { LightningElement, track } from 'lwc';
import bookImages from '@salesforce/resourceUrl/bookImages';
import icons from '@salesforce/resourceUrl/otherImages';
import profileImages from '@salesforce/resourceUrl/profileImages';
import authorImages from '@salesforce/resourceUrl/authorImages';

const author = 
    {   
        id: 0,
        name: 'Test',
        author: 'Andrzej Sapkowski',
        birthDate: '10.03.1978',
        deathDate: '29.01.2022',
        description: 'ASfkjsdkfjbdjfbgdjgbjdfb sjdfgndjkfgbdbg dfgdnfkgjdiu sdgkhdfjgdb d guidhfgiuhdgudf skdjbfjhsdfgvds sfbsuhdfbusdf sdubfsuvdfsdf sdfbsudvf',
        src: authorImages + '/authorImages/andrzej_sapkowski.jpg'
    }

export default class AuthorPage extends LightningElement {
    author = author;
    
}