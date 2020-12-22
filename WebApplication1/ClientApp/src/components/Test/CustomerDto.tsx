export class CustomerDto {
    customerId: string = "";
    name: string = "";
    country: string | null = null;
    state: string | null = null;
    zip: string | null = null;
    city: string | null = null;
    address: string = "";
    [index: string]: string | null;
}
