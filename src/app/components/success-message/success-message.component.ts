import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-success-message',
    templateUrl: './success-message.component.html',
    styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent implements OnInit {
    @Input() message: string = '';
    @Input() visible: boolean = false;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(SimpleChanges: SimpleChanges) {
        if(SimpleChanges.visible && SimpleChanges.visible.currentValue == true) {
            setTimeout(() => {
                this.hideMessage();
            }, 2000);
        }
    }

    hideMessage() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

}
