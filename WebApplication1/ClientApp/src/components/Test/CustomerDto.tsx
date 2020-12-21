export class CustomerDto {
    customerId: string = "";
    name: string = "";
    country: string = "";
    state: string = "";
    zip: string = "";
    city: string = "";
    address: string = "";
    [index: string]: string;
}
