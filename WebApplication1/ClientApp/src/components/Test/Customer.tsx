export class Customer {
    rowNumber: number = 0;
    customerId: string = "";
    name: string = "";
    country: string = "";
    state: string = "";
    zip: string = "";
    city: string = "";
    address: string = "";
    thisYear: string = "";
    lastYear: string = "";
    theYearBeforeLast: string = "";
    number1: string = "";
    number2: string = "";
    number3: string = "";
    [index: string]: string | number;
}
