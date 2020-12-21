import { Customer } from './Customer';

export class DropDownListHelper {
    findCountryDistinct(customers: Customer[]) {
        var countryDistinct = new Set(customers.map(data => data.country));
        console.log("count" + countryDistinct.size);
        console.log(countryDistinct);
    }
}
