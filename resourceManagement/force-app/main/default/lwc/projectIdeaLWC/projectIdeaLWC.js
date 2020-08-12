import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Name__c_FIELD from '@salesforce/schema/Project_Idea__c.Name__c';
import Technology__c_FIELD from '@salesforce/schema/Project_Idea__c.Technology__c';
import Description__c_FIELD from '@salesforce/schema/Project_Idea__c.Description__c';
import employeeId__c_FIELD from '@salesforce/schema/Project_Idea__c.employeeId__c';


export default class ProjectIdeaLWC extends LightningElement {
    createflag=true;
    flag=false;
    fileflag=false;
    uploadbutton=false;
    fields = [Name__c_FIELD,Description__c_FIELD,Technology__c_FIELD,employeeId__c_FIELD];
     recordId;
    onCreate(){
        this.flag=true;
    }
    get acceptedFormats() {
        return ['.pdf', '.png','.jpg','.jpeg'];
    }
    handleUploadFinished(event) {
        this.fileflag=false;
        this.uploadbutton=false;
        this.createflag=true;
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        let uploadedFileNames = '';
        for(let i = 0; i < uploadedFiles.length; i++) {
            uploadedFileNames += uploadedFiles[i].name + ', ';
        }
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: uploadedFiles.length + ' Files uploaded Successfully: ' + uploadedFileNames,
                variant: 'success',
            }),
        );
    }
    handleSuccess(event) {
        this.flag=false;
        this.uploadbutton=true;
        this.recordId=event.detail.id;
        this.createflag=false;
        const evt = new ShowToastEvent({
            title: "Project Idea created succesfully",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }

    cancel(){
        this.uploadbutton=false;
        this.createflag=true;
    }

    uploadDocument(){
        this.fileflag=true;
    }
}
