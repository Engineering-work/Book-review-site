import { LightningElement } from 'lwc';
import profileImages from '@salesforce/resourceUrl/profileImages';

const profile = 
    {   
        id: 0,
        name: 'Mariia Kazanov',
        src: profileImages + '/profileImages/mariia.png',
        email: 'mariia3x@gmail.com',
        login: 'user13'
    }

export default class ProfilePage extends LightningElement {
    profile = profile;
}