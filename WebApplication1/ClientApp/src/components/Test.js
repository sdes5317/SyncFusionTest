"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_grids_2 = require("@syncfusion/ej2-react-grids");
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var Test = /** @class */ (function (_super) {
    __extends(Test, _super);
    function Test(props) {
        var _this = _super.call(this, props) || this;
        _this.gridInstance = null;
        //https://ej2.syncfusion.com/react/documentation/toolbar/item-configuration/
        _this.toolbarOptions = [
            { type: 'Input', template: "#customerId", align: 'Left' },
            { type: 'Input', template: "#name", align: 'Left' },
            { type: 'Input', template: "#country", align: 'Left' },
            { type: 'Input', template: "#state", align: 'Left' },
            { type: 'Input', template: "#zip", align: 'Left' },
            { type: 'Input', template: "#city", align: 'Left' },
            { type: 'Input', template: "#address", align: 'Left' },
            { type: 'Button', template: "#search ", align: 'Left' },
            { type: 'Button', template: "#clear", align: 'Left' },
        ];
        _this.pageSettings = {
            pageSize: 30,
            pageSizes: [5, 10, 15, 20, 25, 30, 50, 75, 100]
        };
        _this.sortSettings = {
            columns: [
                { field: 'customerId', direction: 'Ascending' }
            ]
        };
        _this.selectSettings = {
            enableSimpleMultiRowSelection: true,
            type: 'Multiple'
        };
        _this.indexVal = 1;
        _this.state = {
            data: [],
            dto: new CustomerDto(),
            dropDownList: ["123", "456"]
        };
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.searchClick = _this.searchClick.bind(_this);
        _this.clearClick = _this.clearClick.bind(_this);
        _this.clickNewPage = _this.clickNewPage.bind(_this);
        _this.dataBound = _this.dataBound.bind(_this);
        _this.resizeHandle = _this.resizeHandle.bind(_this);
        return _this;
    }
    Test.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllCustomers()];
                    case 1:
                        _a.sent();
                        window.addEventListener("resize", this.resizeHandle);
                        return [2 /*return*/];
                }
            });
        });
    };
    Test.prototype.getSelectCustomers = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var res, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('test/GetCustomers', {
                            body: JSON.stringify(dto),
                            method: 'POST',
                            headers: {
                                'user-agent': 'Mozilla/4.0 MDN Example',
                                'content-type': 'application/json'
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        results = (_a.sent());
                        this.formatUpdate(results);
                        this.setState({ data: results });
                        return [2 /*return*/];
                }
            });
        });
    };
    Test.prototype.getAllCustomers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('test/GetAllCustomers', {
                            method: 'POST',
                            headers: {
                                'user-agent': 'Mozilla/4.0 MDN Example',
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        results = (_a.sent());
                        this.formatUpdate(results);
                        this.setState({ data: results });
                        return [2 /*return*/];
                }
            });
        });
    };
    Test.prototype.inputRender = function (name, data) {
        var _this = this;
        return (React.createElement("div", { id: name },
            React.createElement("label", null,
                name + ': ',
                React.createElement(ej2_react_inputs_1.TextBoxComponent, { name: name, value: data, input: function (e) { return _this.handleInputChange(e); }, width: '100' }))));
    };
    Test.prototype.handleInputChange = function (e) {
        var _a;
        if (e) {
            var name_1 = ((_a = e.event) === null || _a === void 0 ? void 0 : _a.target).name;
            var value = e.value;
            var dto = this.state.dto;
            if (name_1 && value) {
                dto[name_1] = value;
                this.setState({ dto: dto });
            }
        }
    };
    Test.prototype.render = function () {
        var _this = this;
        var input = (React.createElement(React.Fragment, null,
            this.inputRender("customerId", this.state.dto.customerId),
            this.inputRender("name", this.state.dto.name),
            this.inputRender("country", this.state.dto.country),
            this.inputRender("state", this.state.dto.state),
            this.inputRender("city", this.state.dto.city),
            this.inputRender("zip", this.state.dto.zip),
            this.inputRender("address", this.state.dto.address),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "search", content: "Search", onClick: this.searchClick }),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "clear", content: "Clear", onClick: this.clearClick })));
        var grid = (React.createElement(ej2_react_grids_1.GridComponent, { ref: function (g) { return _this.gridInstance = g; }, dataSource: this.state.data, pageSettings: this.pageSettings, toolbar: this.toolbarOptions, selectionSettings: this.selectSettings, allowPaging: true, allowSorting: true, frozenRows: 0, frozenColumns: 3, enableHover: false, height: "100%", onClick: this.clickNewPage, dataBound: this.dataBound, beforeDataBound: function (e) { return _this.dataBound(); }, resizing: function (e) { return _this.resizeHandle(); }, rowSelected: function (e) { return _this.rowSelected(e); }, rowDeselected: function (e) { return _this.rowDeSelected(e); } },
            React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'rowNumber', width: '130', textAlign: "Right", valueAccessor: this.rowNumerCal.bind(this) }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'customerId', width: '200', textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'name', width: '100', textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'country', textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'state', textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'city', textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'zip', textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'address', textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'thisYear', textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'lastYear', textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'theYearBeforeLast', width: '100', textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'number1', textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'number2', textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'number3', textAlign: 'Right' })),
            React.createElement(ej2_react_grids_2.Inject, { services: [ej2_react_grids_2.Page, ej2_react_grids_2.Sort, ej2_react_grids_1.Freeze, ej2_react_grids_1.Toolbar] })));
        return React.createElement("div", { className: "height90" },
            input,
            grid);
    };
    Test.prototype.rowDeSelected = function (e) {
        if (e && (e.row || e.row.classList || e.mRow || e.mRow.classList)) {
            if (e.row && e.row.classList && e.row.classList.contains('highLight')) {
                e.row.classList.remove('highLight');
            }
            console.log(e);
            if (e.mRow[0] && e.mRow[0].classList && e.mRow[0].classList.contains('highLight')) {
                e.mRow[0].classList.remove('highLight');
            }
        }
    };
    Test.prototype.rowSelected = function (e) {
        console.log(e);
        if (e) {
            e.row.classList.add('highLight');
            e.mRow.classList.add('highLight');
        }
    };
    Test.prototype.searchClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dto, check;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pageInitial();
                        dto = this.state.dto;
                        console.log(dto);
                        check = (dto.address === null || dto.address === "") &&
                            (dto.city === null || dto.city === "") &&
                            (dto.country === null || dto.country === "") &&
                            (dto.customerId === null || dto.customerId === "") &&
                            (dto.name === null || dto.name === "") &&
                            (dto.state === null || dto.state === "") &&
                            (dto.zip === null || dto.zip === "");
                        if (!check) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getAllCustomers()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getSelectCustomers(this.state.dto)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Test.prototype.clearClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dto;
            var _this = this;
            return __generator(this, function (_a) {
                /*
                Ok
                var dto = { ...this.state.dto };
                this.setState({ dto: dto });
                console.log(dto);
        
                Ok
                this.setState(prevState => {
                    let dto = { ...prevState.dto };
                    dto.customerId = '';
                    dto.name = '';
                    dto.country = '';
                    dto.city = '';
                    dto.address = '';
                    dto.state = '';
                    dto.zip = '';
                    return { dto, };
                });
        
                Ok
                this.setState(prevState => {
                let dto = new CustomerDto;
                    return { dto, };
                });
                 */
                this.pageInitial();
                dto = new CustomerDto;
                this.setState({ dto: dto }, function () { return _this.searchClick(); });
                return [2 /*return*/];
            });
        });
    };
    Test.prototype.clickNewPage = function (e) {
        //console.log(e.target);
        //console.log(e.type);
        //console.log(e.detail);
        //console.log(e);
        //console.log(this.state.data[0]);
    };
    Test.prototype.formatUpdate = function (customers) {
        this.dollarFormatUpdate(customers);
        this.formatTestUpdate1(customers);
        this.formatTestUpdate2(customers);
        this.formatTestUpdate3(customers);
    };
    Test.prototype.dollarFormatUpdate = function (customers) {
        var formater = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
        for (var i = 0; i < customers.length; i++) {
            customers[i].thisYear = formater.format(+customers[i].thisYear).toString();
            customers[i].lastYear = formater.format(+customers[i].lastYear).toString();
            customers[i].theYearBeforeLast = formater.format(+customers[i].theYearBeforeLast).toString();
        }
    };
    Test.prototype.formatTestUpdate1 = function (customers) {
        var formater = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });
        for (var i = 0; i < customers.length; i++) {
            customers[i].number1 = formater.format(+customers[i].number1).toString();
        }
    };
    Test.prototype.formatTestUpdate2 = function (customers) {
        var formater = new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2
        });
        for (var i = 0; i < customers.length; i++) {
            customers[i].number2 = formater.format(+customers[i].number2 / 100).toString();
        }
    };
    Test.prototype.formatTestUpdate3 = function (customers) {
        var formater = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
        for (var i = 0; i < customers.length; i++) {
            customers[i].number3 = formater.format(+customers[i].number3).toString();
        }
    };
    //https://www.syncfusion.com/forums/158252/row-number-after-filtering
    // Grid’s dataBound event handler 
    // Value accessor method 
    Test.prototype.rowNumerCal = function (field, data, column) {
        return this.indexVal++;
    };
    ///每次換頁或是排列，重新計算當下的index
    Test.prototype.dataBound = function () {
        // 先取得page 在取得筆數
        // 計算初始值
        var pageNow = this.gridInstance.pagerModule.pagerObj.currentPage;
        var pageCount = this.gridInstance.pagerModule.pagerObj.pageSize;
        this.indexVal = (pageNow - 1) * pageCount + 1;
    };
    Test.prototype.pageInitial = function () {
        this.gridInstance.goToPage(1);
    };
    Test.prototype.resizeHandle = function () {
        this.gridInstance.freezeRefresh();
    };
    return Test;
}(React.Component));
exports.default = Test;
;
var CustomerDto = /** @class */ (function () {
    function CustomerDto() {
        this.customerId = "";
        this.name = "";
        this.country = "";
        this.state = "";
        this.zip = "";
        this.city = "";
        this.address = "";
    }
    return CustomerDto;
}());
var Customer = /** @class */ (function () {
    function Customer() {
        this.rowNumber = 0;
        this.customerId = "";
        this.name = "";
        this.country = "";
        this.state = "";
        this.zip = "";
        this.city = "";
        this.address = "";
        this.thisYear = "";
        this.lastYear = "";
        this.theYearBeforeLast = "";
        this.number1 = "";
        this.number2 = "";
        this.number3 = "";
    }
    return Customer;
}());
//# sourceMappingURL=Test.js.map