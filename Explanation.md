

Implementation Overview
1. Created a json in assets and this can be placed in any CDN and can be modified on the fly without requiring build
2. For Multi-check component all the parameters required are sent in a single object as an Input property
    MultiCheckInput
        options : Option[]  -- options we display for th user
        values: string[];   -- initially selected options
        labels: JsonData;       
        columns: number;    -- no of columns we wish to split our data
    JsonData -- holds the labels and other parameters that are store in assets file
3. Utilized a single method `setCheckboxesState` to set the checkboxes to checked/unchecked
4. Few helper methods to help in reading the elements from DOM and change the state of it
5. Helper method to monitor and update the selected values and emit it to the parent component