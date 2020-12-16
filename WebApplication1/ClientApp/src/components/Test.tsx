import { click, ColumnDirective, ColumnsDirective, Filter, FilterSettingsModel, Freeze, Grid, GridComponent, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { Group, Inject, Page, PageSettingsModel, Sort, SortSettingsModel } from '@syncfusion/ej2-react-grids';
import { DataManager } from '@syncfusion/ej2-data';
import * as React from 'react';
import { ItemModel, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { InputEventArgs, TextBox, TextBoxModel } from '@syncfusion/ej2-react-inputs';
import { EmitType } from '@syncfusion/ej2-base'

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
        { type: 'Button', text: "Search ", click: e => this.searchClick(), align: 'Left' },//text裡的search多一個空格避免使用內建的search
        { type: 'Button', text: "Clear", click: e => this.clearClick(e), align: 'Left' },
    ];
    public pageSettings: PageSettingsModel = { pageSize: 30 };
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
        this.setState({ data: await res.json() });
    }
    private async getAllCustomers() {
        var res = await fetch('test/GetAllCustomers', {
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
            }
        });
        this.setState({ data: await res.json() });
    }

    private inputRender(name: string, data: string) {
        return (<div id={name}><span>{name}</span><input placeholder={name} name={name} value={data} onChange={this.handleInputChange} /></div>);
    }

    handleInputChange(e: React.ChangeEvent<HTMLInputElement> | undefined) {
        if (e) {
            const name = e.target.name;
            const value = e.target.value;
            const dto: CustomerDto = this.state.dto;
            dto[name.toString()] = value;
            this.setState({ dto: dto });
        }
    }

    public render() {
        var input = (
            <>
                { this.inputRender("customerId", this.state.dto.customerId)}
                { this.inputRender("name", this.state.dto.name)}
                { this.inputRender("country", this.state.dto.country)}
                { this.inputRender("state", this.state.dto.state)}
                { this.inputRender("zip", this.state.dto.zip)}
                { this.inputRender("city", this.state.dto.city)}
                { this.inputRender("address", this.state.dto.address)}
            </>
        );

        var grid = (
            <GridComponent
                ref={g => this.gridInstance = g}
                dataSource={this.state.data}
                allowPaging={true}
                allowSorting={true}
                pageSettings={this.pageSettings}
                allowTextWrap={true}
                frozenRows={0}
                frozenColumns={2}
                allowSelection={false} enableHover={false}
                toolbar={this.toolbarOptions}
                height="100%"
            >
                <ColumnsDirective>
                    <ColumnDirective field='customerId' width='100' textAlign='Left' />
                    <ColumnDirective field='name' width='100' textAlign='Left' />
                    <ColumnDirective field='country' width='100' textAlign='Left' />
                    <ColumnDirective field='state' width='100' textAlign='Left' />
                    <ColumnDirective field='zip' width='100' textAlign='Left' />
                    <ColumnDirective field='city' width='100' textAlign='Left' />
                    <ColumnDirective field='address' width='100' textAlign='Left' />
                    <ColumnDirective field='thisYear' width='100' textAlign='Right' />
                    <ColumnDirective field='lastYear' width='100' textAlign='Right' />
                    <ColumnDirective field='theYearBeforeLast' width='100' textAlign='Right' />
                </ColumnsDirective>
                <Inject services={[Page, Sort, Freeze, Toolbar]} />
            </GridComponent>
        );

        //return [input, grid];
        return <div className="height">
            {input}
            {grid}
        </div>
    }
    public searchClick() {
        const dto = this.state.dto;
        const check =
            (dto.address == null || dto.address == "") &&
            (dto.city == null || dto.city == "") &&
            (dto.country == null || dto.country == "") &&
            (dto.customerId == null || dto.customerId == "") &&
            (dto.name == null || dto.name == "") &&
            (dto.state == null || dto.state == "") &&
            (dto.zip == null || dto.zip == "");
        if (check) {
            this.getAllCustomers();
        }
        else {
            this.getSelectCustomers(this.state.dto);
        }
    }

    public clearClick(a: ClickEventArgs | undefined) {
        //Ok
        //var dto = { ...this.state.dto };
        //this.setState({ dto: dto });
        //console.log(dto);

        //Ok
        var dto = new CustomerDto;
        this.setState({ dto: dto });
        console.log(dto);

        this.searchClick();

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

interface IState {
    data: Object[];
    dto: CustomerDto;
}