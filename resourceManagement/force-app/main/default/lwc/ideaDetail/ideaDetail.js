import { LightningElement,wire } from 'lwc';
import {   registerListener,
    unregisterListener,
    unregisterAllListeners,
    fireEvent } from 'c/pubsub';
    import { CurrentPageReference } from 'lightning/navigation';
    import submitReview from '@salesforce/apex/Project_Idea_Lightning.submitReview';
    import { ShowToastEvent } from 'lightning/platformShowToastEvent';
    import Id from '@salesforce/user/Id';

export default class IdeaDetail extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    recordId;
    ratingflag=false;
    comment;
    flag=false;

    connectedCallback() {
        this.ratingflag=false;
        console.log('in connected callvack');
        registerListener('appEvent', this.handleaddevent,this);
       
    }

    handleaddevent(id){
        console.log('in handle event'+id);
        this.recordId=id;
        if(id!=null){
        this.ratingflag=true;
        }
    }

    rating(event){
        this.rating=event.target.value;
    }

    onComment(event){
         this.comment=event.target.value;
    }

    getvalues(){
        console.log('in get values');
        let review = { 'sobjectType': 'Review_RMS__c' };
    review.Project_Idea__c = this.recordId;
    review.Rating__c = this.rating;
    review.comment__c=this.comment;
    review.SubmmitedBy__c=Id;
       
        console.log('review'+JSON.stringify(review));

        submitReview({newreview:review}).then((data)=>{
            console.log('in response'+JSON.stringify(data));
            console.log('in submit review response response ');

            const evt1 = new ShowToastEvent({
                title: "Review has been submitted successfully",
                
                variant: "success"
            });
            this.dispatchEvent(evt1);
            }).catch((error)=>{
                console.log('error1');
            console.log('error'+error.body.message);
            })
        this.ratingflag=false; 
    }

}