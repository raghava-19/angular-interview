import { ElementRef } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MultiCheckInput,JsonData } from '../app.component';
import { MultiCheckComponent } from './multi-check.component';
import { Option } from './multi-check.component'

describe('MultiCheckComponent', () => {
    let comp: MultiCheckComponent;
    let fixture: ComponentFixture<MultiCheckComponent>;
    let input: Element;
    let multiCheckInput = {} as MultiCheckInput;
    const options: Option[] = [
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
    const data : JsonData = {
        label:            'status',
        select_all_label: 'Select All',
        select_all_value: '-99',
        columns_shown:    2
      }
    const expectedOptions = options.map(v => v.value);
    multiCheckInput = {
        options : options,
        values : [],
        labels : data,
        columns : data.columns_shown

    }
    beforeEach(() => {
        TestBed.configureTestingModule(
            {
                declarations: [MultiCheckComponent],
            },
        );
        fixture = TestBed.createComponent(MultiCheckComponent);
        comp = fixture.componentInstance;
        comp.options = options;
    });


    it('should create the MultiCheckComponent', () => {
        expect(comp).toBeDefined();
    });
    it('input for MultiCheckComponent should not be empty', function () {
        expect(Object.keys(multiCheckInput).length).toBeGreaterThan(0);
    });
    it('should click call the method value',() => {
        fakeAsync(() => {
            spyOn(comp, 'checkBoxOptionClicked');
            fixture.detectChanges();
            const input: ElementRef = fixture.debugElement.query(By.css('.form-check-box'));
            input.nativeElement.click();
            tick();
            expect(comp.checkBoxOptionClicked).toHaveBeenCalled();
        });
    });
});
