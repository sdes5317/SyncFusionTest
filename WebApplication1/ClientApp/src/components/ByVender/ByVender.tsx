import React, { Component } from 'react'
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';

interface Props {

}
interface State {
    dto: VenderDto;
}

class VenderDto {
    [index: string]: string;
    Cost: string;
    Qty: string;
    Rank: string;
    Vender: string;
    VenderId: string;
    Agent: string;
    LcCost: string;
    ER: string;
    TtlCost: string;
    TtlQty: string;
    TtlTon: string;
    TtlTeu: string;
    constructor() {
        this.Cost = '';
        this.Qty = '';
        this.Rank = '';
        this.Vender = '';
        this.VenderId = '';
        this.Agent = '';
        this.LcCost = '';
        this.ER = '';
        this.TtlCost = '';
        this.TtlQty = '';
        this.TtlTon = '';
        this.TtlTeu = '';
    }
}

export default class ByVender extends Component<Props, State> {
    state: State;

    constructor(props: Props) {
        super(props)

        this.state = {
            dto: new VenderDto()
        }

        for (const key in this.state.dto) {
            if (key) {
                if (Object.prototype.hasOwnProperty.call(this.state.dto, key)) {
                    const element = this.state.dto[key];
                    console.log(element);
                }
            }
        }
    }


    render() {
        return (
            <GridComponent>
                <ColumnsDirective>
                    <ColumnDirective field='Cost' headerText='Cost123' textAlign="Left" />
                    <ColumnDirective field='' headerText='Cost123' textAlign="Left" />
                    <ColumnDirective field='Cost' headerText='Cost123' textAlign="Left" />
                    <ColumnDirective field='Cost' headerText='Cost123' textAlign="Left" />
                    <ColumnDirective field='Cost' headerText='Cost123' textAlign="Left" />
                    <ColumnDirective field='Cost' headerText='Cost123' textAlign="Left" />
                    <ColumnDirective field='Cost' headerText='Cost123' textAlign="Left" />
                    <ColumnDirective field='Cost' headerText='Cost123' textAlign="Left" />
                </ColumnsDirective>
            </GridComponent>
        )
    }
}
