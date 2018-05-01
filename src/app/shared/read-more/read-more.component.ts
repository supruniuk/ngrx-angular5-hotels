import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'hot-read-more',
    template: `
  <div [innerHTML]="text" [class.collapsed]="isCollapsed" [style.height]="isCollapsed ? maxHeight+'px' : 'auto'">
  </div>
      <a *ngIf="isCollapsable" (click)="isCollapsed =! isCollapsed">Read {{isCollapsed? 'more':'less'}}</a>
  `,
    styles: [`
    div.collapsed {
        overflow: hidden;
    }
  `]
})

export class ReadMoreComponent implements AfterViewInit {

    @Input() text: string;

    @Input() maxHeight = 100;

    // set these to false to get the height of the expended container
    isCollapsed: boolean;

    isCollapsable: boolean;

    constructor(private elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        const currentHeight = this.elementRef.nativeElement.getElementsByTagName('div')[0].offsetHeight;
        if (currentHeight > this.maxHeight) {
            this.isCollapsed = true;
            this.isCollapsable = true;
        }
    }
}
