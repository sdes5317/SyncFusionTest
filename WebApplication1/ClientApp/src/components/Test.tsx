import { click, ColumnDirective, ColumnsDirective, Filter, FilterSettingsModel, Freeze, Grid, GridComponent, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { Group, Inject, Page, PageSettingsModel, Sort, SortSettingsModel } from '@syncfusion/ej2-react-grids';
import { DataManager } from '@syncfusion/ej2-data';
import * as React from 'react';
import { ItemModel } from '@syncfusion/ej2-navigations';
import { InputEventArgs, TextBox, TextBoxModel } from '@syncfusion/ej2-react-inputs';

export default class Test extends React.Component<{}, {}>{

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
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    async componentDidMount() {
        await this.getAllCustomers();
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        window.addEventListener('input', this.handleInputChange);
        document.getElementById('search')?.addEventListener('click', this.searchClick);
    }
    //https://ej2.syncfusion.com/react/documentation/toolbar/item-configuration/
    public toolbarOptions: ToolbarItems[] | ItemModel[] = [
        { type: 'Input', template:"<input placeholder='customerId' id='customerId'></input>", align: 'Left' },
        { type: 'Input', template:"<input placeholder='name' id='name'></input>", align: 'Left' },
        { type: 'Input', template:"<input placeholder='country' id='country'></input>", align: 'Left' },
        { type: 'Input', template:"<input placeholder='state' id='state'></input>", align: 'Left' },
        { type: 'Input', template:"<input placeholder='city' id='city'></input>", align: 'Left' },
        { type: 'Input', template:"<input placeholder='address' id='address'></input>", align: 'Left' },
        { type: 'Input', template:"<input placeholder='zip' id='zip'></input>", align: 'Left' },
        { type: 'Button', template:"<button id='search'>Search</button>", align: 'Left' },
    ];
    public pageSettings: PageSettingsModel = { pageSize: 30 };
    public sortSettings: SortSettingsModel = {
        columns: [
            { field: 'id', direction: 'Ascending' }
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

    handleInputChange(event: any) {
        const name = event.target.id;
        const value = event.target.value;
        const dto: CustomerDto = this.state.dto;
        dto[name.toString()] = value;
        this.setState({ dto: dto });
    }

    public render() {

        var grid = (
            <GridComponent
                ref={g => this.gridInstance = g}
                dataSource={this.state.data}
                allowPaging={true}
                pageSettings={this.pageSettings}
                allowTextWrap={true}
                frozenRows={0}
                frozenColumns={2}
                allowSelection={false} enableHover={false}
                toolbar={this.toolbarOptions}
            >
                <ColumnsDirective>
                    <ColumnDirective field='id' width='100' textAlign='Left' />
                    <ColumnDirective field='name' width='100' textAlign='Left'/>
                    <ColumnDirective field='country' width='100' textAlign='Left'/>
                    <ColumnDirective field='state' width='100' textAlign='Left'/>
                    <ColumnDirective field='zip' width='100' textAlign='Left'/>
                    <ColumnDirective field='city' width='100' textAlign='Left'/>
                    <ColumnDirective field='address' width='100' textAlign='Left'/>
                    <ColumnDirective field='thisYear' width='100' textAlign='Right'/>
                    <ColumnDirective field='lastYear' width='100' textAlign='Right'/>
                    <ColumnDirective field='theYearBeforeLast' width='100' textAlign='Right'/>
                </ColumnsDirective>
                <Inject services={[Page, Sort, Freeze, Toolbar]} />
            </GridComponent>
        );

        return grid;
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
    //元件被回收時刪除訂閱事件，切換頁面時才不會留著
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        window.removeEventListener('input', this.handleInputChange);
    }

    updateWindowDimensions() {
        if (this.gridInstance) {
            this.gridInstance.height = window.innerHeight - 240;
        }
    }
};

class CustomerDto {
    customerId!: string;
    name!: string;
    country!: string;
    state!: string;
    zip!: string;
    city!: string;
    address!: string;
    [index: string]: string;
}

interface IState {
    data: Object[];
    dto: CustomerDto;
}

function createInputText(prop: any): JSX.Element {
    return (<input placeholder={prop.name} id={prop.name}></input>);
}