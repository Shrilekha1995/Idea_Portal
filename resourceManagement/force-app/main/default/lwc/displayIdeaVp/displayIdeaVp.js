import { LightningElement,wire,api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getProjectIdeas from '@salesforce/apex/Project_Idea_Lightning.getProjectIdeas';
import approveIdea from '@salesforce/apex/Project_Idea_Lightning.approveIdea';
import rejectIdea from '@salesforce/apex/Project_Idea_Lightning.rejectIdea';
import submitReview from '@salesforce/apex/Project_Idea_Lightning.submitReview';
import searchIdeaByLocation from '@salesforce/apex/Project_Idea_Lightning.searchIdeaByLocation';
import searchIdeaByName from '@salesforce/apex/Project_Idea_Lightning.searchIdeaByName';
import ideaByTechnology from '@salesforce/apex/Project_Idea_Lightning.ideaByTechnology';
import Id from '@salesforce/user/Id';
import { CurrentPageReference } from 'lightning/navigation';
import {   registerListener,
    unregisterListener,
    unregisterAllListeners,
    fireEvent } from 'c/pubsub';

const actions= [
    { label : 'Show details', name: 'show_details'},
    { label : 'Approve', name: 'Approve'},
    { label : 'Reject', name: 'Reject'},
 
    { label : 'Show reviews', name: 'review'}
];
export default class DisplayIdeaVp extends LightningElement {

    //@wire(getProjectIdeas) ideas;
    ideas;
    @wire(CurrentPageReference) pageRef;
    @api recordId;
    flag=false;
    description='';
    ratingflag=false;
    ratin='';
    comment='';
    rid='';
    Name;
 

    columns = [{
            label: 'Project Idea Name',
            fieldName: 'Name__c',
            type: 'text',
            sortable: true
       //     typeAttributes: {
             //   label: {fieldName: 'Description__c'},
          //  name: 'description',
         //   variant: 'base',
         //   }
        },
        {
            label: 'Status',
            fieldName: 'Status__c',
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
        
        getProjectIdeas().then((data)=>{
            console.log('data'+JSON.stringify(data));
            this.ideas=data;
        }).catch((err)=>{
            console.log('err'+err.body.message);
        })
    }
    

    onComment(event){
        this.comment=event.target.value;
    }

    rowHandler(event){


        console.log("in row handler method"+event.detail.action.name);
        console.log("object id-----"+event.detail.row.Id);
       if(event.detail.action.name=='Approve'){
           console.log('in approvae');
           approveIdea({'recordId':event.detail.row.Id}).then(()=>{
                          console.log('in approve response ');

                           const evt = new ShowToastEvent({
                            title: "Project Idea has been Approved",
                            message: "Record ID: " + event.detail.id,
                            variant: "success"
                        });
                        this.dispatchEvent(evt);
                      //  eval("$A.get('e.force:refreshView').fire();");
                      getProjectIdeas().then((data)=>{
                        console.log('data'+JSON.stringify(data));
                        this.ideas=data;
                    }).catch((err)=>{
                        console.log('err'+err.body.message);
                    })
                     //   window.reload();
           }).catch((err)=>{
                console.log('error'+error.body.message);
           })
       }

       if(event.detail.action.name=='Reject'){
        console.log('in reject');
        rejectIdea({'recordId':event.detail.row.Id}).then(()=>{
                       console.log('in reject response ');
                       const evt = new ShowToastEvent({
                        title: "Project Idea has been rejected",
                        message: "Record ID: " + event.detail.id,
                        variant: "info"
                    });
                    this.dispatchEvent(evt);
                    this.connectedCallback();
        }).catch((err)=>{
             console.log('error'+error.body.message);
        })
    }

    if(event.detail.action.name=='show_details'){

        fireEvent(this.pageRef,'appEvent',event.detail.row.Id);
        
          
    }

    if(event.detail.action.name=='review'){

        fireEvent(this.pageRef,'ratingEvent',event.detail.row.Id);
        
          
    }

   
        
    }
    
    disable(){
        this.flag=false;
    }

    handleLocation(event){
        this.location=event.target.value;

    }

    handleNameSearch(){
          console.log('in handle name search'+this.Name);
        
          searchIdeaByName({'Name':this.Name}).then((data)=>{
            console.log('data'+JSON.stringify(data));
            this.ideas=data;
        }).catch((err)=>{
            console.log('err'+err.body.message);
        })

    }

    handleName(event)
    {
        this.Name=event.target.value;
    }



    handleTechnology(event){
        this.technology=event.target.value;
    }

    handleSearch(){

        searchIdeaByLocation({'location':this.location}).then((data)=>{
            console.log('data'+JSON.stringify(data));
            this.ideas=data;
        }).catch((err)=>{
            console.log('err'+err.body.message);
        })

    }

    handleTechnologySearch(){
        ideaByTechnology({'technology':this.technology}).then((data)=>{
            console.log('data'+JSON.stringify(data));
            this.ideas=data;
        }).catch((err)=>{
            console.log('err'+err.body.message);
        })
    }
    
}