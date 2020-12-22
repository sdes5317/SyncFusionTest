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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var CustomerDto_1 = require("./CustomerDto");
var DropDownListHelper_1 = require("./DropDownListHelper");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var FormatHelper_1 = require("./FormatHelper");
var Test = /** @class */ (function (_super) {
    __extends(Test, _super);
    function Test(props) {
        var _this = _super.call(this, props) || this;
        _this.gridInstance = null;
        _this.dropDownHelper = new DropDownListHelper_1.DropDownListHelper;
        _this.formatHelper = new FormatHelper_1.FormatHelper;
        //https://ej2.syncfusion.com/react/documentation/toolbar/item-configuration/
        _this.toolbarOptions = [
            { type: 'Input', template: "#customerId", align: 'Left' },
            { type: 'Input', template: "#name", align: 'Left' },
            { type: 'Input', template: "#country", align: 'Left' },
            { type: 'Input', template: "#state", align: 'Left' },
            { type: 'Input', template: "#city", align: 'Left' },
            { type: 'Input', template: "#zip", align: 'Left' },
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
            enableSimpleMultiRowSelection: false,
            type: 'Multiple'
        };
        _this.indexVal = 1;
        _this.state = {
            data: [],
            dto: new CustomerDto_1.CustomerDto(),
            dropDownEnum: new DropDownListHelper_1.DropDownEnum()
        };
        _this.inputChangeHandle = _this.inputChangeHandle.bind(_this);
        _this.searchClick = _this.searchClick.bind(_this);
        _this.clearClick = _this.clearClick.bind(_this);
        _this.clickNewPage = _this.clickNewPage.bind(_this);
        _this.beforeDataBoundHandle = _this.beforeDataBoundHandle.bind(_this);
        _this.resizeHandle = _this.resizeHandle.bind(_this);
        _this.countrySelected = _this.countrySelected.bind(_this);
        _this.stateSelected = _this.stateSelected.bind(_this);
        _this.citySelected = _this.citySelected.bind(_this);
        _this.zipSelected = _this.zipSelected.bind(_this);
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
    Test.prototype.render = function () {
        var _this = this;
        var input = (React.createElement(React.Fragment, null,
            this.inputRender("customerId", this.state.dto.customerId),
            this.inputRender("name", this.state.dto.name),
            this.inputRender("address", this.state.dto.address),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "search", content: "Search", onClick: this.searchClick }),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "clear", content: "Clear", onClick: this.clearClick }),
            this.dropDownRender("country", this.state.dropDownEnum.country, this.state.dto.country, this.countrySelected),
            this.dropDownRender("state", this.state.dropDownEnum.state, this.state.dto.state, this.stateSelected),
            this.dropDownRender("city", this.state.dropDownEnum.city, this.state.dto.city, this.citySelected),
            this.dropDownRender("zip", this.state.dropDownEnum.zip, this.state.dto.zip, this.zipSelected)));
        var grid = (React.createElement(ej2_react_grids_1.GridComponent, { ref: function (g) { return _this.gridInstance = g; }, dataSource: this.state.data, pageSettings: this.pageSettings, toolbar: this.toolbarOptions, 
            //selectionSettings={this.selectSettings}
            allowPaging: true, allowSorting: true, frozenRows: 0, frozenColumns: 3, height: "100%", onClick: this.clickNewPage, beforeDataBound: function (e) { return _this.beforeDataBoundHandle(); }, resizing: function (e) { return _this.resizeHandle(); }, recordDoubleClick: function (e) { return _this.doubleClick(e); } },
            React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'rowNumber', maxWidth: "130", textAlign: "Right", valueAccessor: this.rowNumerCal.bind(this) }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'customerId', maxWidth: "200", textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'name', maxWidth: "100", textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'country', autoFit: true, textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'state', autoFit: true, textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'city', autoFit: true, textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'zip', autoFit: true, textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'address', autoFit: true, textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'thisYear', autoFit: true, textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'lastYear', autoFit: true, textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'theYearBeforeLast', autoFit: true, width: '100', textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'number1', autoFit: true, textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'number2', autoFit: true, textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'number3', autoFit: true, textAlign: 'Right' })),
            React.createElement(ej2_react_grids_2.Inject, { services: [ej2_react_grids_2.Page, ej2_react_grids_2.Sort, ej2_react_grids_1.Freeze, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Resize] })));
        return React.createElement("div", { className: "height90" },
            input,
            grid);
    };
    Test.prototype.getSelectCustomers = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var res, results;
            var _this = this;
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
                        this.setState({ data: results }, function () { return _this.initDropDownList(); });
                        return [2 /*return*/];
                }
            });
        });
    };
    Test.prototype.getAllCustomers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, results;
            var _this = this;
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
                        this.setState({ data: results }, function () { return _this.initDropDownList(); });
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
                React.createElement(ej2_react_inputs_1.TextBoxComponent, { name: name, value: data, input: function (e) { return _this.inputChangeHandle(e); }, width: '100' }))));
    };
    Test.prototype.dropDownRender = function (name, data, value, selectEvent) {
        return (React.createElement("div", { id: name },
            React.createElement("label", null,
                name + ': ',
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: data, value: value, width: '150', select: function (e) { if (selectEvent) {
                        selectEvent(e);
                    } } }))));
    };
    Test.prototype.initDropDownList = function () {
        var enums = new DropDownListHelper_1.DropDownEnum();
        enums.country = this.dropDownHelper.findCountryDistinct(this.state.data);
        var dto = new CustomerDto_1.CustomerDto();
        this.setState({
            dto: dto,
            dropDownEnum: enums
        });
    };
    Test.prototype.countrySelected = function (e) {
        var _this = this;
        if (!e)
            return;
        console.log(1111);
        var value = e.itemData.value;
        if (value) {
            var dto = __assign({}, this.state.dto);
            dto.country = value;
            dto.state = null;
            dto.city = null;
            dto.zip = null;
            this.setState({ dto: dto }, function () {
                var stateEnum = _this.dropDownHelper.findStateDistinct(_this.state.dto, _this.state.data);
                var enums = __assign({}, _this.state.dropDownEnum);
                enums.state = stateEnum;
                _this.setState({ dropDownEnum: enums });
            });
        }
    };
    Test.prototype.stateSelected = function (e) {
        var _this = this;
        if (!e)
            return;
        var value = e.itemData.value;
        if (value) {
            var dto = __assign({}, this.state.dto);
            dto.state = value;
            dto.city = null;
            dto.zip = null;
            this.setState({ dto: dto }, function () {
                var cityEnum = _this.dropDownHelper.findCityDistinct(_this.state.dto, _this.state.data);
                var enums = __assign({}, _this.state.dropDownEnum);
                enums.city = cityEnum;
                _this.setState({ dropDownEnum: enums });
            });
        }
    };
    Test.prototype.citySelected = function (e) {
        var _this = this;
        if (!e)
            return;
        var value = e.itemData.value;
        if (value) {
            var dto = __assign({}, this.state.dto);
            dto.city = value;
            dto.zip = null;
            this.setState({ dto: dto }, function () {
                var zipEnum = _this.dropDownHelper.findZipDistinct(_this.state.dto, _this.state.data);
                var enums = __assign({}, _this.state.dropDownEnum);
                enums.zip = zipEnum;
                _this.setState({ dropDownEnum: enums });
            });
        }
    };
    Test.prototype.zipSelected = function (e) {
        if (!e)
            return;
        var value = e.itemData.value;
        if (value) {
            var dto = __assign({}, this.state.dto);
            dto.zip = value;
            this.setState({
                dto: dto
            });
        }
    };
    Test.prototype.inputChangeHandle = function (e) {
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
    Test.prototype.doubleClick = function (e) {
        if (this.gridInstance && e && (e.rowIndex != undefined)) {
            if (this.gridInstance.getFrozenRowByIndex(e.rowIndex).classList.contains('highLight')) {
                this.gridInstance.getFrozenRowByIndex(e.rowIndex).classList.remove("highLight");
                this.gridInstance.getMovableRowByIndex(e.rowIndex).classList.remove("highLight");
            }
            else {
                this.gridInstance.getFrozenRowByIndex(e.rowIndex).classList.add("highLight");
                this.gridInstance.getMovableRowByIndex(e.rowIndex).classList.add("highLight");
            }
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
                        check = (dto.address == null || dto.address == "") &&
                            (dto.city == null || dto.city == "") &&
                            (dto.country == null || dto.country == "") &&
                            (dto.customerId == null || dto.customerId == "") &&
                            (dto.name == null || dto.name == "") &&
                            (dto.state == null || dto.state == "") &&
                            (dto.zip == null || dto.zip == "");
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
            var dto, enums;
            var _this = this;
            return __generator(this, function (_a) {
                dto = new CustomerDto_1.CustomerDto;
                enums = new DropDownListHelper_1.DropDownEnum;
                this.setState({
                    dto: dto,
                    dropDownEnum: enums
                }, function () {
                    _this.searchClick();
                });
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
        this.formatHelper.dollarFormatUpdate(customers);
        this.formatHelper.formatTestUpdate1(customers);
        this.formatHelper.formatTestUpdate2(customers);
        this.formatHelper.formatTestUpdate3(customers);
    };
    //https://www.syncfusion.com/forums/158252/row-number-after-filtering
    //每產生一筆，就加一
    Test.prototype.rowNumerCal = function (field, data, column) {
        return this.indexVal++;
    };
    ///每次換頁或是排列，重新計算當下的index
    Test.prototype.beforeDataBoundHandle = function () {
        // 先取得page 在取得筆數
        // 計算初始值
        if (this.gridInstance) {
            var pageNow = this.gridInstance.pagerModule.pagerObj.currentPage;
            var pageCount = this.gridInstance.pagerModule.pagerObj.pageSize;
            this.indexVal = (pageNow - 1) * pageCount + 1;
        }
    };
    Test.prototype.pageInitial = function () {
        if (this.gridInstance) {
            this.gridInstance.goToPage(1);
        }
    };
    Test.prototype.resizeHandle = function () {
        if (this.gridInstance) {
            this.gridInstance.freezeRefresh();
        }
    };
    return Test;
}(React.Component));
exports.default = Test;
;
//# sourceMappingURL=Test.js.map