import { LightningElement, wire,track } from 'lwc';
import getMarkers from '@salesforce/apex/Project_Idea_Lightning.getMarkers';



export default class CustomMap extends LightningElement {

    // @wire(getMarkers) marker2;

     //{"Name__c":"Inventory Management","employeeId__c":"a0Z2w000000X1dQEAS","Id":"a0X2w000000i64uEAA","employeeId__r":{"City__c":"Pune","Country__c":"India","Id":"a0Z2w000000X1dQEAS"}}

    
//@track arrlist;


  arrlist=[];
  
     markersTitle = "Project Ideas";

     selectedMarkerValue = 'Pune';

    handleMarkerSelect(event) {
        this.selectedMarkerValue = event.detail.selectedMarkerValue;
    }

    connectedCallback(){

        getMarkers().then((data)=>{
            console.log('in connected'+JSON.stringify(data));

          /*  for( var i=0;i<data.length;i++){

                 this.markers[i].value=data[i].Name__c;
                 this.markers[i].location.City=data[i].employeeId__r.City__c;
                 this.markers[i].location.Country=data[i].employeeId__r.Country__c;

            }
        */
           let arr=[];
        data.forEach(element => {
            let obj={};
            let loc={};
           // obj.Id=element.Id;
            obj.value=element.Name__c;
            loc.City=element.employeeId__r.City__c;
            console.log('city'+loc.City);
            loc.Country=element.employeeId__r.Country__c;
            obj.location=loc;
            obj.title=element.Name__c;
            console.log('loc'+JSON.stringify(loc));
            console.log('obj'+JSON.stringify(obj));
            arr.push(obj);
            
        });
             this.arrlist=arr;
            console.log('arr'+JSON.stringify(arr));
            console.log('list'+JSON.stringify(this.arrlist));

        }).catch((err)=>{
            console.log('error'+err);
        })
       
    }

   
}

