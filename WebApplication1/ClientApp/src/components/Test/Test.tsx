import { CellSelectEventArgs, click, ColumnDirective, ColumnModel, ColumnsDirective, DetailDataBoundEventArgs, Filter, FilterSettingsModel, Freeze, Grid, GridComponent, ResizeArgs, RowDataBoundEventArgs, RowSelectingEventArgs, SelectionSettingsModel, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { Group, Inject, Page, PageSettingsModel, Sort, SortSettingsModel } from '@syncfusion/ej2-react-grids';
import { DataManager } from '@syncfusion/ej2-data';
import * as React from 'react';
import { ItemModel, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { InputEventArgs, TextBox, TextBoxComponent, TextBoxModel } from '@syncfusion/ej2-react-inputs';
import { EmitType } from '@syncfusion/ej2-base'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { CustomerDto } from './CustomerDto';
import { Customer } from './Customer';
import { DropDownListHelper, DropDownEnum } from './DropDownListHelper';
import { ChangeEventArgs, DropDownListComponent, SelectEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { FormatHelper } from './FormatHelper';
import { HightHelper } from './HightHelper';

interface IState {
    data: Customer[];
    dto: CustomerDto;
    dropDownEnum: DropDownEnum;
}

export default class Test extends React.Component<{}, IState>{

    public gridInstance: Grid | null = null;
    public state: IState;
    private helper: DropDownListHelper = new DropDownListHelper;
    private formatHelper: FormatHelper = new FormatHelper;
    private hightHelper: HightHelper = new HightHelper;

    constructor(props: any) {
        super(props);

        this.state = {
            data: [],
            dto: new CustomerDto(),
            dropDownEnum: new DropDownEnum()
        };


        this.inputChangeHandle = this.inputChangeHandle.bind(this);
        this.searchClick = this.searchClick.bind(this);
        this.clearClick = this.clearClick.bind(this);
        this.clickNewPage = this.clickNewPage.bind(this);
        this.beforeDataBoundHandle = this.beforeDataBoundHandle.bind(this);
        this.resizeHandle = this.resizeHandle.bind(this);
        this.countrySelected = this.countrySelected.bind(this);
        this.stateSelected = this.stateSelected.bind(this);
        this.citySelected = this.citySelected.bind(this);
        this.zipSelected = this.zipSelected.bind(this);
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
        { type: 'Input', template: "#city", align: 'Left' },
        { type: 'Input', template: "#zip", align: 'Left' },
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

        this.setState({ data: results }, () => this.initDropDownList());
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

        this.setState({ data: results }, () => this.initDropDownList());
    }

    private inputRender(name: string, data: string) {
        return (
            <div id={name}>
                <label>{name + ': '}
                    <TextBoxComponent name={name} value={data} input={e => this.inputChangeHandle(e)} width='100' />
                </label>
            </div>);
    }

    private dropDownRender(
        name: string, data: string[],
        value?: string | null,
        selectEvent?: (e: SelectEventArgs | undefined) => void) {
        return (
            <div id={name}>
                <label>{name + ': '}
                    <DropDownListComponent
                        dataSource={data}
                        value={value!}//由於value要歸零必須為null,這裡加!讓ts編譯可過
                        width='150'
                        select={e => { if (selectEvent) { selectEvent(e); } }} />
                </label>
            </div>);
    }

    initDropDownList() {
        const enums = new DropDownEnum();
        enums.country = this.helper.findCountryDistinct(this.state.data);
        const dto = new CustomerDto();

        this.setState({
            dto: dto,
            dropDownEnum: enums
        });
    }

    countrySelected(e: SelectEventArgs | undefined) {
        if (!e) return;
        console.log(1111);
        const value = e.itemData.value as string;
        if (value) {
            let dto = { ...this.state.dto } as CustomerDto;
            dto.country = value;
            dto.state = null;
            dto.city = null;
            dto.zip = null;
            this.setState({ dto: dto }, () => {
                var stateEnum = this.helper.findStateDistinct(this.state.dto, this.state.data);
                let enums = { ...this.state.dropDownEnum } as DropDownEnum;
                enums.state = stateEnum;
                this.setState({ dropDownEnum: enums });
            });
        }
    }
    stateSelected(e: SelectEventArgs | undefined) {
        if (!e) return;

        const value = e.itemData.value as string;
        if (value) {
            let dto = { ...this.state.dto } as CustomerDto;
            dto.state = value;
            this.setState({ dto: dto }, () => {
                var cityEnum = this.helper.findCityDistinct(this.state.dto, this.state.data);
                let enums = { ...this.state.dropDownEnum } as DropDownEnum;
                enums.city = cityEnum;
                this.setState({ dropDownEnum: enums });
            });
        }
    }
    citySelected(e: SelectEventArgs | undefined) {
        if (!e) return;

        const value = e.itemData.value as string;
        if (value) {
            let dto = { ...this.state.dto } as CustomerDto;
            dto.city = value;
            this.setState({ dto: dto }, () => {
                var zipEnum = this.helper.findZipDistinct(this.state.dto, this.state.data);
                let enums = { ...this.state.dropDownEnum } as DropDownEnum;
                enums.zip = zipEnum;
                this.setState({ dropDownEnum: enums });
            });
        }
    }
    zipSelected(e: SelectEventArgs | undefined) {
        if (!e) return;

        const value = e.itemData.value as string;
        if (value) {
            let dto = { ...this.state.dto } as CustomerDto;
            dto.zip = value;
            this.setState({
                dto: dto
            });
        }
    }

    inputChangeHandle(e: InputEventArgs | undefined) {
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
                { this.inputRender("address", this.state.dto.address)}
                { <ButtonComponent id="search" content="Search" onClick={this.searchClick} />}
                { <ButtonComponent id="clear" content="Clear" onClick={this.clearClick} />}
                {this.dropDownRender("country", this.state.dropDownEnum.country, this.state.dto.country, this.countrySelected)}
                {this.dropDownRender("state", this.state.dropDownEnum.state, this.state.dto.state, this.stateSelected)}
                {this.dropDownRender("city", this.state.dropDownEnum.city, this.state.dto.city, this.citySelected)}
                {this.dropDownRender("zip", this.state.dropDownEnum.zip, this.state.dto.zip, this.zipSelected)}
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
                beforeDataBound={e => this.beforeDataBoundHandle()}
                resizing={e => this.resizeHandle()}
                rowSelected={e => this.hightHelper.rowSelected(e)}
                rowDeselected={e => this.hightHelper.rowDeSelected(e)}
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
    
    public async searchClick() {
        this.pageInitial();
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
            await this.getAllCustomers();
        }
        else {
            await this.getSelectCustomers(this.state.dto);
        }
    }

    public async clearClick() {
        let dto = new CustomerDto;
        let enums = new DropDownEnum;

        this.setState(
            {
                dto: dto,
                dropDownEnum: enums
            },
            () => {
                console.log({ ...this.state.dto });
                this.searchClick();
            });
    }

    clickNewPage(e: React.MouseEvent<Element, MouseEvent>) {
        //console.log(e.target);
        //console.log(e.type);
        //console.log(e.detail);
        //console.log(e);
        //console.log(this.state.data[0]);
    }

    formatUpdate(customers: Customer[]): void {
        this.formatHelper.dollarFormatUpdate(customers);
        this.formatHelper.formatTestUpdate1(customers);
        this.formatHelper.formatTestUpdate2(customers);
        this.formatHelper.formatTestUpdate3(customers);
    }

    indexVal: number = 1;
    //https://www.syncfusion.com/forums/158252/row-number-after-filtering
    //每產生一筆，就加一
    rowNumerCal(field: string, data: Object, column: ColumnModel) {
        return this.indexVal++;
    }
    ///每次換頁或是排列，重新計算當下的index
    beforeDataBoundHandle() {
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