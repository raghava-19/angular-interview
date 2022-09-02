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
export class MultiCheckComponent implements OnChanges, AfterViewInit {

  @Input() multiCheckInput = {} as MultiCheckInput;
  @Output() onChange = new EventEmitter<Option[]>();
  public values: string[] = [];
  public options: Option[] = [];

  /**
   * 
   * @param multiCheckInput has all the required inputs
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.multiCheckInput) {
      this.options = changes.multiCheckInput.currentValue.options;
      this.values = changes.multiCheckInput.currentValue.values;
    }
  }

  ngAfterViewInit() {
    const item = document?.getElementById('options_container');
    item!.style.columnCount = String(this.multiCheckInput.labels.columns_shown);
  }

  /**
   * 
   * @param option source option
   * @param event event
   */
  public checkBoxOptionClicked(option: Option, event: Event) {
    //check for selectall option
    if (option?.label == this.multiCheckInput?.labels?.select_all_label) {
      this.values = [];
      this.setCheckboxesState(this.fetchAllCheckboxes(), (<HTMLInputElement>event?.target)?.checked);
    } else {
      //check for other options
      const sourceElement = this.fetchCheckbox((<HTMLInputElement>event?.target)?.id);
      this.setCheckboxesState(sourceElement, !this.values?.includes(option.value));
      this.validateSelectedValues();
    }
    this.emitCheckBoxSelection();
  }
  
  /**
   * Update the HTMLElement checked's state
   * @param checkboxes 
   * @param checkedstate checks if element is alreadey selected or not
   * @param selectIndividual 
   */
  private setCheckboxesState(checkboxes: (NodeList | Element | null), checkedstate: boolean, selectIndividual: boolean = true) {
    let checkboxeslist = checkboxes instanceof NodeList ? checkboxes : [checkboxes];
    checkboxeslist.forEach((input) => {
      let item = input as HTMLInputElement;
      item.checked = checkedstate;
      (selectIndividual) ? this.updateSelectedValues(item.defaultValue, new Event('click'), item.checked) : null;
    }
    )
  }

  //update values array to store selected options
  private updateSelectedValues(value: string, event: Event, targedChecked?: boolean) {
    if ((<HTMLInputElement>event?.target)?.checked || targedChecked) {
      this.values.push(value);
    } else {
      let index = this.values.indexOf(value);
      (index > -1) ? this.values.splice(index, 1) : null;
    }
  }

  //to monitor if all options are selected individually
  private validateSelectedValues() {
    let selectAllElement = this.fetchCheckbox('form-check-input ' + this.multiCheckInput.labels.select_all_value);
    console.log('selectall', selectAllElement)
    if (this.values.length === this.options.length - 1) {
      this.setCheckboxesState(selectAllElement, true, false);
    } else {
      this.setCheckboxesState(selectAllElement, false, false);
    }
  }

  private fetchAllCheckboxes() {
    return document.querySelectorAll('.form-check-box');
  }

  private fetchCheckbox(id: string) {
    return document.getElementById(id);
  }
  
  //emit selected options
  private emitCheckBoxSelection(): void {
    this.onChange.emit(this.options?.filter(option => option.label !== this.multiCheckInput?.labels?.select_all_label
      && this.values?.includes(option.value)));
  }

}
