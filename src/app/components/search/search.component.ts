import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    @Input() query: string = '';
    @Output() queryChange: EventEmitter<string> = new EventEmitter();
    constructor() { }

    ngOnInit(): void {
    }

    textChanged() {
        this.queryChange.emit(this.query);
    }

}
