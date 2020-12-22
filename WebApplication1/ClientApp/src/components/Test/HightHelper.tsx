import { RowDeselectEventArgs, RowSelectEventArgs } from '@syncfusion/ej2-react-grids';

export class HightHelper {
    rowDeSelected(e: RowDeselectEventArgs): void {
        let args = e as any;
        if (args && (args.row || args.row.classList || args.mRow || args.mRow.classList)) {
            if (args.row && args.row.classList && args.row.classList.contains('highLight')) {
                args.row.classList.remove('highLight');
            }

            if (args.mRow[0] && args.mRow[0].classList && args.mRow[0].classList.contains('highLight')) {
                args.mRow[0].classList.remove('highLight');
            }
        }
    }
    rowSelected(e: RowSelectEventArgs): void {
        let args = e as any;
        if (args) {
            args.row.classList.add('highLight');
            args.mRow.classList.add('highLight');
        }
    }
}
