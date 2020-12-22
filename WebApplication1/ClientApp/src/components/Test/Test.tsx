import { ColumnDirective, ColumnModel, ColumnsDirective, Freeze, Grid, GridComponent, RecordDoubleClickEventArgs, Resize, SelectionSettingsModel, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { Inject, Page, PageSettingsModel, Sort, SortSettingsModel } from '@syncfusion/ej2-react-grids';
import * as React from 'react';
import { ItemModel } from '@syncfusion/ej2-navigations';
import { InputEventArgs, TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { CustomerDto } from './CustomerDto';
import { Customer } from './Customer';
import { DropDownListHelper, DropDownEnum } from './DropDownListHelper';
import { DropDownListComponent, SelectEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { FormatHelper } from './FormatHelper';

interface IState {
    data: Customer[];
    dto: CustomerDto;
    dropDownEnum: DropDownEnum;
}

export default class Test extends React.Component<{}, IState>{

    public gridInstance: Grid | null = null;
    public state: IState;
    private dropDownHelper: DropDownListHelper = new DropDownListHelper;
    private formatHelper: FormatHelper = new FormatHelper;

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
        { type: 'Input', template: "#toolbarElement", align: 'Left' }
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
        enableSimpleMultiRowSelection: false,
        type: 'Multiple'
    };

    public render() {
        var toolbarElement = (
            <>
                <div id="toolbarElement">
                    {this.inputRender("customerId", this.state.dto.customerId)}
                    {this.inputRender("name", this.state.dto.name)}
                    {this.dropDownRender("country", this.state.dropDownEnum.country, this.state.dto.country, this.countrySelected)}
                    {this.dropDownRender("state", this.state.dropDownEnum.state, this.state.dto.state, this.stateSelected)}<br />
                    {this.dropDownRender("city", this.state.dropDownEnum.city, this.state.dto.city, this.citySelected)}
                    {this.dropDownRender("zip", this.state.dropDownEnum.zip, this.state.dto.zip, this.zipSelected)}
                    {this.inputRender("address", this.state.dto.address)}
                    {<ButtonComponent id="search" content="Search" onClick={this.searchClick} className={"toolbar-button"} />}
                    {<ButtonComponent id="clear" content="Clear" onClick={this.clearClick} className={"toolbar-button"} />}
                </div>
            </>
        );


        var grid = (
            <GridComponent
                ref={g => this.gridInstance = g}
                dataSource={this.state.data}
                pageSettings={this.pageSettings}
                toolbar={this.toolbarOptions}
                //selectionSettings={this.selectSettings}
                allowPaging={true}
                allowSorting={true}
                frozenRows={0}
                frozenColumns={3}
                height="100%"
                onClick={this.clickNewPage}
                beforeDataBound={e => this.beforeDataBoundHandle()}
                resizing={e => this.resizeHandle()}
                recordDoubleClick={e => this.doubleClick(e)}
            >
                <ColumnsDirective>
                    <ColumnDirective field='rowNumber' maxWidth="130" textAlign="Right" valueAccessor={this.rowNumerCal.bind(this)} />
                    <ColumnDirective field='customerId' maxWidth="200" textAlign='Left' />
                    <ColumnDirective field='name' maxWidth="100" textAlign='Left' />
                    <ColumnDirective field='country' autoFit={true} textAlign='Left' />
                    <ColumnDirective field='state' autoFit={true} textAlign='Left' />
                    <ColumnDirective field='city' autoFit={true} textAlign='Left' />
                    <ColumnDirective field='zip' autoFit={true} textAlign='Left' />
                    <ColumnDirective field='address' autoFit={true} textAlign='Left' />
                    <ColumnDirective field='thisYear' autoFit={true} textAlign='Right' />
                    <ColumnDirective field='lastYear' autoFit={true} textAlign='Right' />
                    <ColumnDirective field='theYearBeforeLast' autoFit={true} width='100' textAlign='Right' />
                    <ColumnDirective field='number1' autoFit={true} textAlign='Right' />
                    <ColumnDirective field='number2' autoFit={true} textAlign='Right' />
                    <ColumnDirective field='number3' autoFit={true} textAlign='Right' />
                </ColumnsDirective>
                <Inject services={[Page, Sort, Freeze, Toolbar, Resize]} />
            </GridComponent>
        );

        return <div className="height90">
            {toolbarElement}
            {grid}
        </div>
    }

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
            <span id={name}>
                <label>{name + ': '}
                    <TextBoxComponent name={name} value={data} input={e => this.inputChangeHandle(e)} width='100' />
                </label>
            </span>);
    }

    private dropDownRender(
        name: string, data: string[],
        value?: string | null,
        selectEvent?: (e: SelectEventArgs | undefined) => void) {
        return (
            <span id={name}>
                <label>{name + ': '}
                    <DropDownListComponent
                        dataSource={data}
                        value={value!}//由於value要歸零必須為null,這裡加!讓ts編譯可過
                        width='150'
                        select={e => { if (selectEvent) { selectEvent(e); } }} />
                </label>
            </span>);
    }

    initDropDownList() {
        const enums = new DropDownEnum();
        enums.country = this.dropDownHelper.findCountryDistinct(this.state.data);
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
                var stateEnum = this.dropDownHelper.findStateDistinct(this.state.dto, this.state.data);
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
            dto.city = null;
            dto.zip = null;
            this.setState({ dto: dto }, () => {
                var cityEnum = this.dropDownHelper.findCityDistinct(this.state.dto, this.state.data);
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
            dto.zip = null;
            this.setState({ dto: dto }, () => {
                var zipEnum = this.dropDownHelper.findZipDistinct(this.state.dto, this.state.data);
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

    doubleClick(e: RecordDoubleClickEventArgs | undefined): void {
        if (this.gridInstance && e && (e.rowIndex != undefined)) {
            if (this.gridInstance.getFrozenRowByIndex(e.rowIndex).classList.contains('highLight')) {
                this.gridInstance.getFrozenRowByIndex(e.rowIndex).classList.remove("highLight");
                this.gridInstance.getMovableRowByIndex(e.rowIndex).classList.remove("highLight");
            } else {
                this.gridInstance.getFrozenRowByIndex(e.rowIndex).classList.add("highLight");
                this.gridInstance.getMovableRowByIndex(e.rowIndex).classList.add("highLight");
            }
        }
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