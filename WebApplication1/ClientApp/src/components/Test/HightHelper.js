"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HightHelper = void 0;
var HightHelper = /** @class */ (function () {
    function HightHelper() {
    }
    HightHelper.prototype.rowDeSelected = function (e) {
        var args = e;
        if (args && (args.row || args.row.classList || args.mRow || args.mRow.classList)) {
            if (args.row && args.row.classList && args.row.classList.contains('highLight')) {
                args.row.classList.remove('highLight');
            }
            if (args.mRow[0] && args.mRow[0].classList && args.mRow[0].classList.contains('highLight')) {
                args.mRow[0].classList.remove('highLight');
            }
        }
    };
    HightHelper.prototype.rowSelected = function (e) {
        var args = e;
        if (args) {
            args.row.classList.add('highLight');
            args.mRow.classList.add('highLight');
        }
    };
    return HightHelper;
}());
exports.HightHelper = HightHelper;
//# sourceMappingURL=HightHelper.js.map