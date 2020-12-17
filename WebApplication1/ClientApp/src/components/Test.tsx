import { click, ColumnDirective, ColumnsDirective, Filter, FilterSettingsModel, Freeze, Grid, GridComponent, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { Group, Inject, Page, PageSettingsModel, Sort, SortSettingsModel } from '@syncfusion/ej2-react-grids';
import { DataManager } from '@syncfusion/ej2-data';
import * as React from 'react';
import { ItemModel, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { InputEventArgs, TextBox, TextBoxComponent, TextBoxModel } from '@syncfusion/ej2-react-inputs';
import { EmitType } from '@syncfusion/ej2-base'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

export default class Test extends React.Component<{}, IState>{

    public gridInstance: Grid | null = null;
    public state: IState;

    constructor(props: any) {
        super(props);

        this.state = {
            data: [],
            dto: new CustomerDto(),
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.searchClick = this.searchClick.bind(this);
        this.clearClick = this.clearClick.bind(this);
        this.clickNewPage = this.clickNewPage.bind(this);
    }

    async componentDidMount() {
        await this.getAllCustomers();
    }
    //https://ej2.syncfusion.com/react/documentation/toolbar/item-configuration/
    public toolbarOptions: ToolbarItems[] | ItemModel[] = [
        { type: 'Input', template: "#customerId", align: 'Left' },
        { type: 'Input', template: "#name", align: 'Left' },
        { type: 'Input', template: "#country", align: 'Left' },
        { type: 'Input', template: "#state", align: 'Left' },
        { type: 'Input', template: "#zip", align: 'Left' },
        { type: 'Input', template: "#city", align: 'Left' },
        { type: 'Input', template: "#address", align: 'Left' },
        { type: 'Button', template: "#search ", align: 'Left' },//text裡的search多一個空格避免使用內建的search
        { type: 'Button', template: "#clear", align: 'Left' },
    ];
    public pageSettings: PageSettingsModel = {
        pageSize: 30,
        pageSizes: [5, 10, 15, 20, 25, 30, 50, 75, 100]
    };
    public sortSettings: SortSettingsModel = {
        columns: [
            { field: 'customerId', direction: 'Ascending' }
        ]
    };

    private async getSelectCustomers(dto: CustomerDto) {
        var res = await fetch('test/GetCustomers', {
            body: JSON.stringify(dto),
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            }
        });

        const results = (await res.json()) as Customer[];
        this.dollarFormatUpdate(results);

        this.setState({ data: results });
    }
    private async getAllCustomers() {
        var res = await fetch('test/GetAllCustomers', {
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
            }
        });

        const results = (await res.json()) as Customer[];
        this.dollarFormatUpdate(results);

        this.setState({ data: results });
    }

    private inputRender(name: string, data: string) {
        return (
            <div id={name}>
                <TextBoxComponent floatLabelType="Auto" placeholder={name} name={name} value={data} input={e => this.handleInputChange(e)} />
            </div>);
    }

    handleInputChange(e: InputEventArgs | undefined) {
        if (e) {
            const name = (e.event?.target as HTMLInputElement).name;
            const value = e.value;
            const dto: CustomerDto = this.state.dto;

            if (name && value) {
                dto[name] = value;
                this.setState({ dto: dto });
            }
        }
    }

    public render() {
        var input = (
            <>
                { this.inputRender("customerId", this.state.dto.customerId)}
                { this.inputRender("name", this.state.dto.name)}
                { this.inputRender("country", this.state.dto.country)}
                { this.inputRender("state", this.state.dto.state)}
                { this.inputRender("city", this.state.dto.city)}
                { this.inputRender("zip", this.state.dto.zip)}
                { this.inputRender("address", this.state.dto.address)}
                { <ButtonComponent id="search" content="Search" onClick={this.searchClick} />}
                { <ButtonComponent id="clear" content="Clear" onClick={this.clearClick} />}
            </>
        );

        var grid = (
            <GridComponent
                ref={g => this.gridInstance = g}
                dataSource={this.state.data}
                allowPaging={true}
                allowSorting={true}
                pageSettings={this.pageSettings}
                frozenRows={0}
                frozenColumns={2}
                allowSelection={false} enableHover={false}
                toolbar={this.toolbarOptions}
                height="100%"
                onClick={this.clickNewPage}
            >
                <ColumnsDirective>
                    <ColumnDirective field='customerId' width='200' textAlign='Left' />
                    <ColumnDirective field='name' width='120' textAlign='Left' />
                    <ColumnDirective field='country' width='100' textAlign='Left' />
                    <ColumnDirective field='state' width='100' textAlign='Left' />
                    <ColumnDirective field='city' width='100' textAlign='Left' />
                    <ColumnDirective field='zip' width='100' textAlign='Left' />
                    <ColumnDirective field='address' width='100' textAlign='Left' />
                    <ColumnDirective field='thisYear' width='100' textAlign='Right' />
                    <ColumnDirective field='lastYear' width='100' textAlign='Right' />
                    <ColumnDirective field='theYearBeforeLast' width='100' textAlign='Right' />
                </ColumnsDirective>
                <Inject services={[Page, Sort, Freeze, Toolbar]} />
            </GridComponent>
        );

        return <div className="height90">
            {input}
            {grid}
        </div>
    }
    public async searchClick() {
        const dto = this.state.dto;
        console.log(dto);
        const check =
            (dto.address === null || dto.address === "") &&
            (dto.city === null || dto.city === "") &&
            (dto.country === null || dto.country === "") &&
            (dto.customerId === null || dto.customerId === "") &&
            (dto.name === null || dto.name === "") &&
            (dto.state === null || dto.state === "") &&
            (dto.zip === null || dto.zip === "");
        if (check) {
            await this.getAllCustomers();
        }
        else {
            await this.getSelectCustomers(this.state.dto);
        }
    }

    public async clearClick() {
        //Ok
        //var dto = { ...this.state.dto };
        //this.setState({ dto: dto });
        //console.log(dto);

        //Ok


        var dto = new CustomerDto;
        await this.setState(
            { dto: dto },
            () => this.searchClick());


        //Ok
        //this.setState(prevState => {
        //    let dto = { ...prevState.dto };
        //    dto.customerId = '';
        //    dto.name = '';
        //    dto.country = '';
        //    dto.city = '';
        //    dto.address = '';
        //    dto.state = '';
        //    dto.zip = '';
        //    return { dto, };
        //});

        //Ok
        //this.setState(prevState => {
        //let dto = new CustomerDto;
        //    return { dto, };
        //});
    }

    clickNewPage(e: React.MouseEvent<Element, MouseEvent>) {
        console.log(e.target);
        console.log(e.type);
        console.log(e.detail);
        console.log(e);
        console.log(this.state.data[0]);
    }

    dollarFormatUpdate(customers: Customer[]): void {
        const formater = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        for (var i = 0; i < customers.length; i++) {
            customers[i].thisYear = formater.format(+customers[i].thisYear).toString();
            customers[i].lastYear = formater.format(+customers[i].lastYear).toString();
            customers[i].theYearBeforeLast = formater.format(+customers[i].theYearBeforeLast).toString();
        }
    }
};

class CustomerDto {
    customerId: string = "";
    name: string = "";
    country: string = "";
    state: string = "";
    zip: string = "";
    city: string = "";
    address: string = "";
    [index: string]: string;
}

class Customer {
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
    [index: string]: string;
}

interface IState {
    data: Customer[];
    dto: CustomerDto;
}