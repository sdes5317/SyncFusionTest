import { CellSelectEventArgs, click, ColumnDirective, ColumnModel, ColumnsDirective, DetailDataBoundEventArgs, Filter, FilterSettingsModel, Freeze, Grid, GridComponent, ResizeArgs, RowDataBoundEventArgs, RowDeselectEventArgs, RowSelectEventArgs, RowSelectingEventArgs, SelectionSettingsModel, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { Group, Inject, Page, PageSettingsModel, Sort, SortSettingsModel } from '@syncfusion/ej2-react-grids';
import { DataManager } from '@syncfusion/ej2-data';
import * as React from 'react';
import { ItemModel, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { InputEventArgs, SelectedEventArgs, TextBox, TextBoxComponent, TextBoxModel } from '@syncfusion/ej2-react-inputs';
import { EmitType } from '@syncfusion/ej2-base'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { CustomerDto } from './CustomerDto';
import { Customer } from './Customer';
import { DropDownListHelper } from './DropDownListHelper';

interface IState {
    data: Customer[];
    dto: CustomerDto;
    dropDownList: string[]
}

export default class Test extends React.Component<{}, IState>{

    public gridInstance: Grid | null = null;
    public state: IState;
    private helper: DropDownListHelper = new DropDownListHelper;

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
        this.resizeHandle = this.resizeHandle.bind(this);
    }

    async componentDidMount() {
        await this.getAllCustomers();
        window.addEventListener("resize", this.resizeHandle);
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
    public selectSettings: SelectionSettingsModel = {
        enableSimpleMultiRowSelection: true,
        type: 'Multiple'
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
        this.formatUpdate(results);

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
        this.formatUpdate(results);

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
                selectionSettings={this.selectSettings}
                allowPaging={true}
                allowSorting={true}
                frozenRows={0}
                frozenColumns={3}
                enableHover={false}
                height="100%"
                onClick={this.clickNewPage}
                dataBound={this.dataBound}
                beforeDataBound={e => this.dataBound()}
                resizing={e => this.resizeHandle()}
                rowSelected={e => this.rowSelected(e)}
                rowDeselected={e => this.rowDeSelected(e)}
            >
                <ColumnsDirective>
                    <ColumnDirective field='rowNumber' width='130' textAlign="Right" valueAccessor={this.rowNumerCal.bind(this)} />
                    <ColumnDirective field='customerId' width='200' textAlign='Left' />
                    <ColumnDirective field='name' width='100' textAlign='Left' />
                    <ColumnDirective field='country' textAlign='Left' />
                    <ColumnDirective field='state' textAlign='Left' />
                    <ColumnDirective field='city' textAlign='Left' />
                    <ColumnDirective field='zip' textAlign='Left' />
                    <ColumnDirective field='address' textAlign='Left' />
                    <ColumnDirective field='thisYear' textAlign='Right' />
                    <ColumnDirective field='lastYear' textAlign='Right' />
                    <ColumnDirective field='theYearBeforeLast' width='100' textAlign='Right' />
                    <ColumnDirective field='number1' textAlign='Right' />
                    <ColumnDirective field='number2' textAlign='Right' />
                    <ColumnDirective field='number3' textAlign='Right' />
                </ColumnsDirective>
                <Inject services={[Page, Sort, Freeze, Toolbar]} />
            </GridComponent>
        );

        return <div className="height90">
            {input}
            {grid}
        </div>
    }
    rowDeSelected(e: any): void {
        if (e && (e.row || e.row.classList || e.mRow || e.mRow.classList)) {
            if (e.row && e.row.classList && e.row.classList.contains('highLight')) {
                e.row.classList.remove('highLight');
            }
            console.log(e);
            if (e.mRow[0] && e.mRow[0].classList && e.mRow[0].classList.contains('highLight')) {
                e.mRow[0].classList.remove('highLight');
            }
        }
    }
    rowSelected(e: any): void {
        console.log(e);
        if (e) {
            e.row.classList.add('highLight');
            e.mRow.classList.add('highLight');
        }
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

    formatUpdate(customers: Customer[]): void {
        this.dollarFormatUpdate(customers);
        this.formatTestUpdate1(customers);
        this.formatTestUpdate2(customers);
        this.formatTestUpdate3(customers);
    }

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
    indexVal: number = 1;
    //https://www.syncfusion.com/forums/158252/row-number-after-filtering
    // Grid’s dataBound event handler 
    // Value accessor method 
    rowNumerCal(field: string, data: Object, column: ColumnModel) {
        return this.indexVal++;
    }
    ///每次換頁或是排列，重新計算當下的index
    dataBound() {
        // 先取得page 在取得筆數
        // 計算初始值

        if (this.gridInstance) {
            var pageNow = this.gridInstance.pagerModule.pagerObj.currentPage;
            var pageCount = this.gridInstance.pagerModule.pagerObj.pageSize;

            this.indexVal = (pageNow - 1) * pageCount + 1;
        }
    }
    pageInitial() {
        if (this.gridInstance) {
            this.gridInstance.goToPage(1);
        }
    }
    resizeHandle() {
        if (this.gridInstance) {
            this.gridInstance.freezeRefresh();
        }
    }
};