import { Component, OnInit } from '@angular/core';
import { Option } from './components/multi-check.component';
import  * as MultiCheckLabels from '../assets/multi-check-labels.json';
const defaultValues: string[] = [];
export type MultiCheckInput ={
  options : Option[];
  values: string[];
  labels: Object;
  columns: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit{
  public jsondata  = MultiCheckLabels;
  public options: Option[] = [
    { label: 'aaa', value: '111' },
    { label: 'bbb', value: '222' },
    { label: 'ccc', value: '333' },
    { label: 'ddd', value: '444' },
    { label: 'eee', value: '555' },
    { label: 'Under Agreement', value: '666' },
    { label: 'ggg', value: '777' },
    { label: 'hhh', value: '888' },
    { label: 'iii', value: '999' },
  ];
  public selectedValues:string[] = defaultValues;
  public selectAllOption!: Option;
  public multiCheckInput!: MultiCheckInput;

  constructor() {
    this.selectAllOption = {
      label: this.jsondata.select_all_label,
      value: this.jsondata.select_all_value
    }
  }

  ngOnInit(): void {
    this.options?.length > 0 ? this.options?.unshift(this.selectAllOption) :'';
    this.frameOptionsOnLoad();
  }

  public onSelectedOptionsChange(options: Option[]): void {
    this.selectedValues = options.map((it) => it.value);
  }
  /**
   * framing an input with all required data to pass to multi-check component
   */
  private frameOptionsOnLoad(){
    this.multiCheckInput = {
      options: this.options,
      values: this.selectedValues,
      labels: this.jsondata,
      columns: this.jsondata.columns_shown
    }
  }
}
