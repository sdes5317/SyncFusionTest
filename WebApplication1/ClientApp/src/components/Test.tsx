import { ColumnDirective, ColumnsDirective, Filter, FilterSettingsModel, Grid, GridComponent } from '@syncfusion/ej2-react-grids';
import { Group, Inject, Page, PageSettingsModel, Sort, SortSettingsModel } from '@syncfusion/ej2-react-grids';
import { DataManager } from '@syncfusion/ej2-data';
import * as React from 'react';
import { data } from './datasource';

export default class App extends React.Component<{}, {}>{

    public gridInstance: Grid;
    public data!: any;

    public async onLoad() {
        console.log(this.gridInstance);
        if (this.gridInstance) {
            /** height of the each row */
            //const rowHeight: number = this.gridInstance.getRowHeight();
            ///** Grid height */
            //const gridHeight: number = this.gridInstance.height as number;
            ///** initial page size */
            //const pageSize: number = this.gridInstance.pageSettings.pageSize as number;
            ///** new page size is obtained here */
            //const pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight;
            //this.gridInstance.pageSettings.pageSize = pageSize + Math.round(pageResize);

            var res = await fetch('test');
            console.log(res);
            var oobj = await res.json();
            console.log(oobj);
            console.log(typeof (oobj));
            console.log(data);
            console.log(typeof (data));
            debugger;
            this.gridInstance.dataSource = oobj;
            //this.data = oobj;

        }
    }

    componentDidMount() {
        this.onLoad();
    }

    public pageSettings: PageSettingsModel = { pageSize: 6 }
    public sortSettings: SortSettingsModel = {
        columns: [
            { field: 'employeeID', direction: 'Ascending' }
        ]
    };
    public filterSettings: FilterSettingsModel = {
        columns: [
            { field: 'employeeID', operator: 'greaterthan', value: 2 }
        ]
    };

    public render() {
        return <GridComponent
            ref={g => this.gridInstance = g}
            //dataSource={this.data}
            allowPaging={true} pageSettings={this.pageSettings}>
            <ColumnsDirective>
                <ColumnDirective field='orderID' width='100' textAlign="Right" />
                <ColumnDirective field='customerID' width='100' />
                <ColumnDirective field='employeeID' width='100' textAlign="Right" />
                <ColumnDirective field='freight' width='100' format="C2" textAlign="Right" />
                <ColumnDirective field='shipCountry' width='100' />
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