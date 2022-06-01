import { Component } from '@angular/core';

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
  styleUrls: ['./multi-check.component.less']
})
export class MultiCheckComponent {
  // @todo
}
