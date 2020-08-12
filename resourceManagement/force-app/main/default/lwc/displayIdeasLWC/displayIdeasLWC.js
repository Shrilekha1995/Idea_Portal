import { LightningElement,api, wire } from 'lwc';
import getProjectIdeas from '@salesforce/apex/Project_Idea_Lightning.getProjectIdeas';
import searchIdeaByLocation from '@salesforce/apex/Project_Idea_Lightning.searchIdeaByLocation';
import ideaByTechnology from '@salesforce/apex/Project_Idea_Lightning.ideaByTechnology';
import { CurrentPageReference } from 'lightning/navigation';
import Id from '@salesforce/user/Id';
const actions= [
    { label : 'Show details', name: 'show_details'}
];
export default class DisplayIdeasLWC extends LightningElement {
   // @wire(getProjectIdeas) ideas;
   @wire(CurrentPageReference) pageRef;
   ideas;
    @api recordId;
    flag=false;
    description='';
    location='';
    technology='';

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
        },{
            label:'Technology',
            fieldName:'Technology__c',
            type:'text'
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
    handleLocation(event){
        this.location=event.target.value;

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

    rowHandler(event){
        console.log("in row handler method");
        console.log("object id-----"+event.detail.row.Id);
        fireEvent(this.pageRef,'appEvent',event.detail.row.Id);
        //this.ideas.forEach(idea => {
            //console.log('in fo'+idea);
            
        //});
      //  console.log('data of idea'+JSON.stringify(this.ideas))
     /*   for (var i=0;i<this.ideas.length;i++) {
            console.log('in for loop'+JSON.stringify(this.ideas[i].Description__c));
           if(this.ideas[i].Id==event.detail.row.Id)
           {
               console.log('in if condition');
               
               this.description=this.ideas[i].Description__c;
               this.flag=true;
              
           }
          }
          */
       
        
    }
    disable(){
        this.flag=false;
    }
}