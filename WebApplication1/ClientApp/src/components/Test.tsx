import { ColumnDirective, ColumnsDirective, Filter, FilterSettingsModel, Freeze, Grid, GridComponent } from '@syncfusion/ej2-react-grids';
import { Group, Inject, Page, PageSettingsModel, Sort, SortSettingsModel } from '@syncfusion/ej2-react-grids';
import { DataManager } from '@syncfusion/ej2-data';
import * as React from 'react';
import { TextBox } from '@syncfusion/ej2-inputs'

export default class Test extends React.Component<{}, {}>{

    public gridInstance!: Grid;
    public state: IState;

    constructor(props: any) {
        super(props);

        this.state = {
            data: [],
            dto: new CustomerDto()
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.searchClick = this.searchClick.bind(this);
    }

    async componentDidMount() {
        var dto = new CustomerDto();

        await this.getAllCustomers(dto);
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
    private async getAllCustomers(dto: CustomerDto) {
        var res = await fetch('test/GetAllCustomers', {
            body: JSON.stringify(dto),
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
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

        var grid = (
            <>
                <table>
                    <tr>
                        <td>
                            <div id="input-container" className="textboxes">
                                <h4>CustomerId</h4>
                                <input
                                    id="CustomerId"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </td>
                        <td>
                            <div id="input-container" className="textboxes">
                                <h4>Name</h4>
                                <input
                                    id="Name"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </td>
                        <td>
                            <div id="input-container" className="textboxes">
                                <h4>Country</h4>
                                <input
                                    id="Country"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </td>
                        <td>
                            <div id="input-container" className="textboxes">
                                <h4>State</h4>
                                <input
                                    id="State"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="input-container" className="textboxes">
                                <h4>City</h4>
                                <input
                                    id="City"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </td>
                        <td>
                            <div id="input-container" className="textboxes">
                                <h4>Address</h4>
                                <input
                                    id="Address"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </td>
                        <td>
                            <div id="input-container" className="textboxes">
                                <h4>Zip</h4>
                                <input
                                    id="Zip"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </td>
                        <td>
                            <button onClick={this.searchClick}>Search</button>
                        </td>
                    </tr>
                </table>
                <GridComponent
                    //ref={g => this.gridInstance = g}
                    dataSource={this.state.data}
                    allowPaging={true}
                    pageSettings={this.pageSettings}
                    allowTextWrap={true}
                    frozenRows={0}
                    frozenColumns={2}
                    height="600"
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
            </>
        );

        return grid;
    }
    public searchClick() {
        this.getSelectCustomers(this.state.dto);
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
    dto: CustomerDto
}
