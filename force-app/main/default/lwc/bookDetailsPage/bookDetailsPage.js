import { LightningElement, track, api } from 'lwc';
import bookImages from '@salesforce/resourceUrl/bookImages';
import icons from '@salesforce/resourceUrl/otherImages';
import profileImages from '@salesforce/resourceUrl/profileImages';

const book = 
    {   
        id: 0,
        title: 'Ostatnie życzenie',
        author: 'Andrzej Sapkowski',
        pages: 330,
        releaseDate: '24-05-1993',
        series: 'Wiedzmin',
        genre: 'Fantastyka',
        description: "Później mówiono, że człowiek ów nadszedł od północy, od Bramy Powroźniczej. Nie był stary, ale włosy miał zupełnie białe. Kiedy ściągnął płaszcz, okazało się, że na pasie za plecami ma miecz.",
        average: 9.00,
        src: bookImages + '/bookImages/wiedzminOstatnieZyczenie.jpg'
    }

const ratings = [
    {   
        id: 0,
        name: 'Mariia',
        description: 'Wciągająca, porywająca, fantastyczna!',
        src: profileImages + '/profileImages/mariia.png',
        number: 9
    },
    {   
        id: 1,
        name: 'Borys',
        description: 'Autor nie oszukuje; pokazuje świat takim, jakim jest - szarym, nie czarno-białym.',
        src: profileImages + '/profileImages/borys.png',
        number: 9
    }
]

export default class BookDetailsPage extends LightningElement {

@api id;

book = book;
ratings = ratings;
star = icons + '/otherImages/star.png';
@track ispopupactive = false;

    goToDiscussions(){
        
    }
    goToReviews(){

    }
    handleAddRating(){
        if(this.ispopupactive === false){
            this.ispopupactive = true;
        }
    }

    handleispopupactiveChange(event){
        this.ispopupactive = event.detail;
    }
    connecedCallback(){
        console.log('id '+this.id);
    }
}