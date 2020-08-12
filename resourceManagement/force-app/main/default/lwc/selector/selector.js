import { LightningElement } from 'lwc';
import RMS_Image from '@salesforce/resourceUrl/RMS_Image';

export default class Selector extends LightningElement {
    selectedProductId;

    handleProductSelected(evt) {
        this.selectedProductId = evt.detail;
    }
}
