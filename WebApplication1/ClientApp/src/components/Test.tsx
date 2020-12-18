import { click, ColumnDirective, ColumnModel, ColumnsDirective, DetailDataBoundEventArgs, Filter, FilterSettingsModel, Freeze, Grid, GridComponent, RowDataBoundEventArgs, SelectionSettingsModel, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';
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
            dropDownList: ["123", "456"]
        };


        this.handleInputChange = this.handleInputChange.bind(this);
        this.searchClick = this.searchClick.bind(this);
        this.clearClick = this.clearClick.bind(this);
        this.clickNewPage = this.clickNewPage.bind(this);
        this.dataBound = this.dataBound.bind(this);
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
                <label>{name + ': '}
                    <TextBoxComponent name={name} value={data} input={e => this.handleInputChange(e)} width='100' />
                </label>
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
                pageSettings={this.pageSettings}
                toolbar={this.toolbarOptions}
                allowPaging={true}
                allowSorting={true}
                frozenRows={0}
                frozenColumns={3}
                enableHover={false}
                height="100%"
                onClick={this.clickNewPage}
                dataBound={this.dataBound}
                beforeDataBound={e=>this.dataBound()}
            >
                <ColumnsDirective>
                    <ColumnDirective field='rowNumber' width='130' textAlign="Right" valueAccessor={this.rowNumerCal.bind(this)} />
                    <ColumnDirective field='customerId' width='200' textAlign='Left' />
                    <ColumnDirective field='name' width='100' textAlign='Left' />
                    <ColumnDirective field='country' width='50' textAlign='Left' />
                    <ColumnDirective field='state' width='50' textAlign='Left' />
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
        this.pageInitial();
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
        /*
        Ok
        var dto = { ...this.state.dto };
        this.setState({ dto: dto });
        console.log(dto);

        Ok
        this.setState(prevState => {
            let dto = { ...prevState.dto };
            dto.customerId = '';
            dto.name = '';
            dto.country = '';
            dto.city = '';
            dto.address = '';
            dto.state = '';
            dto.zip = '';
            return { dto, };
        });

        Ok
        this.setState(prevState => {
        let dto = new CustomerDto;
            return { dto, };
        });
         */

        this.pageInitial();
        var dto = new CustomerDto;
        this.setState(
            { dto: dto },
            () => this.searchClick());
    }

    clickNewPage(e: React.MouseEvent<Element, MouseEvent>) {
        //console.log(e.target);
        //console.log(e.type);
        //console.log(e.detail);
        //console.log(e);
        //console.log(this.state.data[0]);
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
    indexVal: number = 1;
    //https://www.syncfusion.com/forums/158252/row-number-after-filtering
    // Grid’s dataBound event handler 
    // Value accessor method 
    rowNumerCal(field: string, data: Object, column: ColumnModel) {
        console.log("start" + this.indexVal);
        return this.indexVal++;
    }
    dataBound() {
        // 先取得page 在取得筆數
        // 計算初始值

        var pageNow = this.gridInstance.pagerModule.pagerObj.currentPage;
        var pageCount = this.gridInstance.pagerModule.pagerObj.pageSize;

        console.log(pageNow);
        console.log(pageCount);
        
        this.indexVal = (pageNow - 1) * pageCount + 1;
        //this.gridInstance.refresh();
    }
    pageInitial() {
        this.gridInstance.goToPage(1);
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
    [index: string]: string | number;
}

interface IState {
    data: Customer[];
    dto: CustomerDto;
    dropDownList: string[]
}