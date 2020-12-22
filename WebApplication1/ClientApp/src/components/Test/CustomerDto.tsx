export class CustomerDto {
    customerId: string = "";
    name: string = "";
    country: string | undefined;
    state: string | undefined;
    zip: string | undefined;
    city: string | undefined;
    address: string = "";
    [index: string]: any;
}
