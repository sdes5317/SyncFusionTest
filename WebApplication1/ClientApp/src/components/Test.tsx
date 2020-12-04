import { ColumnDirective, ColumnsDirective, Filter, FilterSettingsModel, Grid, GridComponent } from '@syncfusion/ej2-react-grids';
import { Group, Inject, Page, PageSettingsModel, Sort, SortSettingsModel } from '@syncfusion/ej2-react-grids';
import { DataManager } from '@syncfusion/ej2-data';
import * as React from 'react';
import { TextBox } from '@syncfusion/ej2-inputs'

export default class Test extends React.Component<{}, {}>{

    public gridInstance!: Grid;
    public state: IState;

    constructor(props: any) {
        super(props);
        this.state = { data: [] };
    }

    async componentDidMount() {
        var dto = new CustomerDto();
        dto.customerId = 'abcd'

        var res = await fetch('test/GetDbCustomer', {
            body: JSON.stringify(dto),
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            }
        });
        this.setState({ data: await res.json() });
    }

    public pageSettings: PageSettingsModel = { pageSize: 30 }
    public sortSettings: SortSettingsModel = {
        columns: [
            { field: 'id', direction: 'Ascending' }
        ]
    };

    public render() {

        var grid = (
            <><div id='loader'>Loading....</div><div id='container'>
                <div className='wrap'>
                    <div id="input-container" className="textboxes">


                        <h4> Textbox with clear icon</h4>
                        <input id="firstName" />
                    </div>
                    <div id="input-container" className="textboxes">
                        <h4>Floating Textbox with clear icon</h4>
                        <input id="lastName" />
                    </div>
                </div>
            </div>
                <GridComponent
                    //ref={g => this.gridInstance = g}
                    dataSource={this.state.data}
                    allowPaging={true} pageSettings={this.pageSettings}>
                    <ColumnsDirective>
                        <ColumnDirective field='id' width='150' textAlign="Right"  />
                        <ColumnDirective field='name' width='50' />
                        <ColumnDirective field='country' width='50' textAlign="Right" />
                        <ColumnDirective field='state' width='50' textAlign="Right" />
                        <ColumnDirective field='zip' width='50' />
                        <ColumnDirective field='address' width='200' />
                    </ColumnsDirective>
                    <Inject services={[Page, Sort, Filter, Group]} />
                </GridComponent></>
        );

        return grid;
    }
};

class CustomerDto {
    customerId!: string;
    name!: string;
    country!: string;
    state!: string;
    zip!: string;
    address!: string;
}

interface IState {
    data: Object[];
}
