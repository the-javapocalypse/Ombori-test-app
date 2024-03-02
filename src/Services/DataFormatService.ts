export const isDate = (_date: string) => {
    // @ts-ignore
    // return (new Date(_date) !== "Invalid Date") && !isNaN(new Date(_date));

   // updated code below
    // var parsedDate = Date.parse(_date);
    // return (isNaN(parseInt(_date)) && !isNaN(parsedDate))

    // update 2.0
    const _regExp  = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$');
    return _regExp.test(_date);
}

export const toTitleCase = (_str: string) => {
    if(_str){
        return _str.toString().replace(
            /\w\S*/g,
            function (_txt) {
                return _txt.charAt(0).toUpperCase() + _txt.substr(1).toLowerCase();
            }
        );
    } else {
        return 'N/A';
    }

}

export const formatData = (_paramsArray: any) => {
    let formattedArray: any = [];
    _paramsArray.forEach((_item: any) => {

        // check if undefined
        if (_item == null) {
            formattedArray.push('N/A');
        }

        // check if boolean
        else if (_item == true || _item == false) {
            formattedArray.push(_item == true ? 'Yes' : 'No');
        }

        // check if date
        if (isDate(_item)) {
            formattedArray.push(new Date(_item).toLocaleDateString("en-US",{month:'short', day: 'numeric', year:'numeric'}));
        }

        // check if normal string
        else {
            formattedArray.push(toTitleCase(_item));
        }
    })
    return formattedArray;
}
