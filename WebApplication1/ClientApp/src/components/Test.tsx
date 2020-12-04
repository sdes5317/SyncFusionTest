import { ColumnDirective, ColumnsDirective, Filter, FilterSettingsModel, Grid, GridComponent } from '@syncfusion/ej2-react-grids';
import { Group, Inject, Page, PageSettingsModel, Sort, SortSettingsModel } from '@syncfusion/ej2-react-grids';
import { DataManager } from '@syncfusion/ej2-data';
import * as React from 'react';
import { data } from './datasource';

export default class App extends React.Component<{}, {}>{

    public gridInstance!: Grid;
    public data!: any;

    async componentDidMount() {
        if (this.gridInstance) {

            var dto = new CustomerDto();
            dto.customerId ='10'

            var res = await fetch('test/GetDbCustomer', {
                body: JSON.stringify(dto),
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json'
                }
            });
            var oobj = await res.json();
            this.gridInstance.dataSource = oobj;
            //this.data = oobj;
        }
    }

    public pageSettings: PageSettingsModel = { pageSize: 30 }
    public sortSettings: SortSettingsModel = {
        columns: [
            { field: 'id', direction: 'Ascending' }
        ]
    };

    public render() {
        return <GridComponent
            ref={g => this.gridInstance = g}
            //dataSource={this.data}
            allowPaging={true} pageSettings={this.pageSettings}>
            <ColumnsDirective>
                <ColumnDirective field='id' width='100' textAlign="Right" />
                <ColumnDirective field='name' width='100' />
                <ColumnDirective field='country' width='100' textAlign="Right" />
                <ColumnDirective field='state' width='100' textAlign="Right" />
                <ColumnDirective field='zip' width='100' />
                <ColumnDirective field='status' width='100' />
                <ColumnDirective field='address' width='100' />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group]} />
        </GridComponent>
    }

    //async GetFakeData() {
    //    var res = await fetch('test');
    //    console.log(res);
    //    var oobj = res.json();
    //    console.log(oobj);
    //    return res;

    //}

    //public GetData(): Object[] {
    //    return data;
    //}
};

class CustomerDto {
    customerId!: string;
    name!: string;
    country!: string;
    state!: string;
    zip!: string;
    address!: string;
}
