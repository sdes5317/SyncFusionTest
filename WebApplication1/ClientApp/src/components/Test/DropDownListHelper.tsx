import { Customer } from './Customer';
import { CustomerDto } from './CustomerDto';

export class DropDownEnum {
    country: string[] = [];
    state: string[] = [];
    city: string[] = [];
    zip: string[] = [];
}

export class DropDownListHelper {
    findCountryDistinct(customers: Customer[]):string[] {
        var countries = new Set(customers.map(data => data.country));
        return Array.from(countries);
    }

    findStateDistinct(selected: CustomerDto, customers: Customer[]): string[] {
        var states = new Set(
            customers.filter(c => c.country == selected.country).map(c => c.state));
        return Array.from(states);
    }
    findCityDistinct(selected: CustomerDto, customers: Customer[]): string[] {
        var cities = new Set(
            customers.filter(c => c.country == selected.country).filter(c => c.state == selected.state).map(c => c.city));
        return Array.from(cities);
    }
    findZipDistinct(selected: CustomerDto, customers: Customer[]): string[] {
        var zips = new Set(
            customers.filter(c => c.country == selected.country).filter(c => c.state == selected.state).filter(c => c.city == selected.city).map(c => c.zip));
        return Array.from(zips);
    }
}
