import { LightningElement } from 'lwc';
import { employees } from 'c/data';

export default class List extends LightningElement {
    employees = employees;

    handleTileClick(evt) {
        // This component wants to emit a productselected event to its parent
        const event = new CustomEvent('productselected', {
            detail: evt.detail
        });
        // Fire the event from c-list
        this.dispatchEvent(event);
    }
}
