import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MultiCheckInput } from '../app.component';

export type Option = {
	label: string;
	value: string;
};

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */

@Component({
  selector: 'app-multi-check',
  templateUrl: './multi-check.component.html',
  styleUrls: ['./multi-check.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiCheckComponent implements OnChanges ,AfterViewInit {

  @Input() multiCheckInput = {} as MultiCheckInput;
  @Output() onChange = new EventEmitter<Option[]>();
  public label!: string;
  public columns!: number;
  public options : Option[] = []


  ngOnChanges(changes: SimpleChanges) {
   if(changes.multiCheckInput){
      this.options = changes.multiCheckInput.currentValue.options;
      this.label = changes.multiCheckInput.currentValue.labels.label; 
      this.columns = changes.multiCheckInput.currentValue.labels.columns_shown;
    }
  }


  ngAfterViewInit() {
    const item = document.getElementById('options_container');
    item!.style.columnCount = String(this.columns);
  }

}
