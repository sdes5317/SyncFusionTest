﻿import { ColumnDirective, ColumnsDirective, Filter, FilterSettingsModel, Freeze, Grid, GridComponent } from '@syncfusion/ej2-react-grids';
import { Group, Inject, Page, PageSettingsModel, Sort, SortSettingsModel } from '@syncfusion/ej2-react-grids';
import { DataManager } from '@syncfusion/ej2-data';
import * as React from 'react';
import { TextBox } from '@syncfusion/ej2-inputs'

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
    }

    public pageSettings: PageSettingsModel = { pageSize: 30 }
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

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.id;
        const value = event.target.value;

        const dto: CustomerDto = this.state.dto;
        dto[name.toString()] = value;
        this.setState({ dto: dto });
    }

    public render() {

        var inputTexts = (
            <div className="container-fluid">
                <div className="row">
                    <div id="input-container" className="textboxes">
                        <h4>CustomerId</h4>
                        <input
                            id="customerId"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div id="input-container" className="textboxes">
                        <h4>Name</h4>
                        <input
                            id="name"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div id="input-container" className="textboxes">
                        <h4>Country</h4>
                        <input
                            id="country"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div id="input-container" className="textboxes">
                        <h4>State</h4>
                        <input
                            id="state"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div id="input-container" className="textboxes">
                        <h4>City</h4>
                        <input
                            id="city"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div id="input-container" className="textboxes">
                        <h4>Address</h4>
                        <input
                            id="address"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div id="input-container" className="textboxes">
                        <h4>Zip</h4>
                        <input
                            id="zip"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <button onClick={this.searchClick}>Search</button>
                </div>
            </div>
        );

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
            >
                <ColumnsDirective>
                    <ColumnDirective field='id' width='100' textAlign="Right" />
                    <ColumnDirective field='name' width='100' />
                    <ColumnDirective field='country' width='100' textAlign="Right" />
                    <ColumnDirective field='state' width='100' textAlign="Right" />
                    <ColumnDirective field='zip' width='100' />
                    <ColumnDirective field='city' width='100' />
                    <ColumnDirective field='address' width='100' />
                    <ColumnDirective field='thisYear' width='100' />
                    <ColumnDirective field='lastYear' width='100' />
                    <ColumnDirective field='theYearBeforeLast' width='100' />
                </ColumnsDirective>
                <Inject services={[Page, Sort, Freeze]} />
            </GridComponent>
        );

        const elements = [inputTexts, grid];

        return elements;
    }
    public searchClick() {
        const dto = this.state.dto;
        console.log(dto);
        const check =
            (dto.address == null || dto.address == "") &&
            (dto.city == null || dto.city == "") &&
            (dto.country == null || dto.country == "") &&
            (dto.customerId == null || dto.customerId == "") &&
            (dto.name == null || dto.name == "") &&
            (dto.state == null || dto.state == "") &&
            (dto.zip == null || dto.zip == "");
        console.log(dto.country);
        console.log(check);
        console.log(typeof (check));
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
    }

    updateWindowDimensions() {
        if (this.gridInstance) {
            this.gridInstance.height = window.innerHeight - 300;
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
