import { Customer } from './Customer';


export class FormatHelper {
    dollarFormatUpdate(customers: Customer[]): void {
        const formater = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        } as Intl.NumberFormatOptions);

        for (var i = 0; i < customers.length; i++) {
            customers[i].thisYear = formater.format(+customers[i].thisYear).toString();
            customers[i].lastYear = formater.format(+customers[i].lastYear).toString();
            customers[i].theYearBeforeLast = formater.format(+customers[i].theYearBeforeLast).toString();
        }
    }
    formatTestUpdate1(customers: Customer[]): void {
        const formater = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        } as Intl.NumberFormatOptions);

        for (var i = 0; i < customers.length; i++) {
            customers[i].number1 = formater.format(+customers[i].number1).toString();
        }
    }
    formatTestUpdate2(customers: Customer[]): void {
        const formater = new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2
        } as Intl.NumberFormatOptions);

        for (var i = 0; i < customers.length; i++) {
            customers[i].number2 = formater.format(+customers[i].number2 / 100).toString();
        }
    }
    formatTestUpdate3(customers: Customer[]): void {
        const formater = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        } as Intl.NumberFormatOptions);

        for (var i = 0; i < customers.length; i++) {
            customers[i].number3 = formater.format(+customers[i].number3).toString();
        }
    }
}
