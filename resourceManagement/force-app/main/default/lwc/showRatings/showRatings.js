import { LightningElement,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import {   registerListener,
    unregisterListener,
    unregisterAllListeners,
    fireEvent } from 'c/pubsub';
    import { CurrentPageReference } from 'lightning/navigation';
    import showReviews from '@salesforce/apex/Project_Idea_Lightning.showReviews';
export default class ShowRatings extends LightningElement {

    reviews;
    @wire(CurrentPageReference) pageRef;

    columns = [{
        label: 'Submitted by',
        fieldName: 'Submitter_Name__c',
        type: 'text',
        sortable: true
   
    },
    {
        label: 'Rating',
        fieldName: 'Rating__c',
        type: 'text',
        sortable: true
    },{
        label:'Comment',
        fieldName:'comment__c',
        type:'text'
    }
  
];


    connectedCallback() {
        console.log('in connected callback');
        registerListener('ratingEvent', this.handleEvent,this);
       
    }

    handleEvent(pid){

    showReviews({'pid':pid}).then((data)=>{
        console.log('in show reviews')
        console.log('data'+JSON.stringify(data));
        this.reviews=data;
    }).catch((err)=>{
        console.log('err'+err.body.message);
    })
}
}