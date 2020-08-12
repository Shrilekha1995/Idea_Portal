import { LightningElement,wire,api} from 'lwc';
import getVacancies from '@salesforce/apex/Project_Idea_Lightning.getVacancies';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createApplication from '@salesforce/apex/Project_Idea_Lightning.createApplication';
import searchByLocation from '@salesforce/apex/Project_Idea_Lightning.searchByLocation';
import Id from '@salesforce/user/Id';

const actions= [
    { label : 'Apply', name: 'Apply'}
];
export default class Vacancies extends LightningElement {
vacancies;
    //@wire(getVacancies) vacancies;
    @api recordId;
    location;


    columns = [{
            label: 'Name',
            fieldName: 'Name',
            type: 'text',
            sortable: true
        },
        {
            label: 'Technology',
            fieldName: 'Technology__c',
            type: 'text',
            sortable: true
        },
        {
            label: 'Skills',
            fieldName: 'Skills__c',
            type: 'text',
            sortable: true,
            wrapText: true
            
        },
        {
            label: 'No of positions',
            fieldName: 'No_of_positions__c',
            type: 'Number',
            sortable: true
        },{

            label: 'location',
            fieldName: 'location__c',
            type: 'text',
            sortable: true

        },
        {
            label: 'Actions',
        type : 'action',
        typeAttributes: {rowActions: actions}
    }
        
        
        
      
    ]; 

    connectedCallback(){

        getVacancies().then((data)=>{
            console.log('data'+JSON.stringify(data));
            this.vacancies=data;
        }).catch((err)=>{
            console.log('err'+err.body.message);
        })

    }

    handleLocation(event)
    {
        this.location=event.target.value;
    }
    handleSearch(){

        searchByLocation({'location':this.location}).then((data)=>{
            console.log('data'+JSON.stringify(data));
            this.vacancies=data;
        }).catch((err)=>{
            console.log('err'+err.body.message);
        })

    }

    rowHandler(event){

        let app = { 'sobjectType': 'Applications__c' };
        app.Applicant__c = Id;
        app.Vacancy__c =event.detail.row.Id ;

        console.log('application'+JSON.stringify(app));
       

        
        createApplication({application:app}).then(()=>{
            console.log('in submit review response response ');

            const evt1 = new ShowToastEvent({
                title: "You have successfully applied for this vacancy",
                //message: "Vacancy Name " + event.detail.id,
                variant: "success"
            });
            this.dispatchEvent(evt1);
            }).catch((error)=>{
                console.log('error1');
            console.log('error'+error.body.message);
            })

    }

}