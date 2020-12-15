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
            { type: 'Input', template: "#city", align: 'Left' },
            { type: 'Input', template: "#address", align: 'Left' },
            { type: 'Input', template: "#zip", align: 'Left' },
            { type: 'Button', text: "Search ", click: function (e) { return _this.searchClick(); }, align: 'Left' },
            { type: 'Button', text: "Clear", click: function (e) { return _this.clearClick(e); }, align: 'Left' },
        ];
        _this.pageSettings = { pageSize: 30 };
        _this.sortSettings = {
            columns: [
                { field: 'id', direction: 'Ascending' }
            ]
        };
        _this.state = {
            data: [],
            dto: new CustomerDto(),
        };
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.searchClick = _this.searchClick.bind(_this);
        _this.clearClick = _this.clearClick.bind(_this);
        return _this;
    }
    Test.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllCustomers()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Test.prototype.getSelectCustomers = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, fetch('test/GetCustomers', {
                            body: JSON.stringify(dto),
                            method: 'POST',
                            headers: {
                                'user-agent': 'Mozilla/4.0 MDN Example',
                                'content-type': 'application/json'
                            }
                        })];
                    case 1:
                        res = _c.sent();
                        _a = this.setState;
                        _b = {};
                        return [4 /*yield*/, res.json()];
                    case 2:
                        _a.apply(this, [(_b.data = _c.sent(), _b)]);
                        return [2 /*return*/];
                }
            });
        });
    };
    Test.prototype.getAllCustomers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, fetch('test/GetAllCustomers', {
                            method: 'POST',
                            headers: {
                                'user-agent': 'Mozilla/4.0 MDN Example',
                            }
                        })];
                    case 1:
                        res = _c.sent();
                        _a = this.setState;
                        _b = {};
                        return [4 /*yield*/, res.json()];
                    case 2:
                        _a.apply(this, [(_b.data = _c.sent(), _b)]);
                        return [2 /*return*/];
                }
            });
        });
    };
    Test.prototype.inputRender = function (name, data) {
        return (React.createElement("div", { id: name },
            React.createElement("span", null, name),
            React.createElement("input", { placeholder: name, name: name, value: data, onChange: this.handleInputChange })));
    };
    Test.prototype.handleInputChange = function (e) {
        if (e) {
            var name_1 = e.target.name;
            var value = e.target.value;
            var dto = this.state.dto;
            dto[name_1.toString()] = value;
            this.setState({ dto: dto });
        }
    };
    Test.prototype.render = function () {
        var _this = this;
        var input = (React.createElement(React.Fragment, null,
            this.inputRender("customerId", this.state.dto.customerId),
            this.inputRender("name", this.state.dto.name),
            this.inputRender("country", this.state.dto.country),
            this.inputRender("state", this.state.dto.state),
            this.inputRender("zip", this.state.dto.zip),
            this.inputRender("city", this.state.dto.city),
            this.inputRender("address", this.state.dto.address)));
        var grid = (React.createElement(ej2_react_grids_1.GridComponent, { ref: function (g) { return _this.gridInstance = g; }, dataSource: this.state.data, allowPaging: true, pageSettings: this.pageSettings, allowTextWrap: true, frozenRows: 0, frozenColumns: 2, allowSelection: false, enableHover: false, toolbar: this.toolbarOptions, height: "100%" },
            React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'id', width: '100', textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'name', width: '100', textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'country', width: '100', textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'state', width: '100', textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'zip', width: '100', textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'city', width: '100', textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'address', width: '100', textAlign: 'Left' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'thisYear', width: '100', textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'lastYear', width: '100', textAlign: 'Right' }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'theYearBeforeLast', width: '100', textAlign: 'Right' })),
            React.createElement(ej2_react_grids_2.Inject, { services: [ej2_react_grids_2.Page, ej2_react_grids_2.Sort, ej2_react_grids_1.Freeze, ej2_react_grids_1.Toolbar] })));
        //return [input, grid];
        return React.createElement("div", { className: "height" },
            input,
            grid);
    };
    Test.prototype.searchClick = function () {
        var dto = this.state.dto;
        var check = (dto.address == null || dto.address == "") &&
            (dto.city == null || dto.city == "") &&
            (dto.country == null || dto.country == "") &&
            (dto.customerId == null || dto.customerId == "") &&
            (dto.name == null || dto.name == "") &&
            (dto.state == null || dto.state == "") &&
            (dto.zip == null || dto.zip == "");
        if (check) {
            this.getAllCustomers();
        }
        else {
            this.getSelectCustomers(this.state.dto);
        }
    };
    Test.prototype.clearClick = function (a) {
        //Ok
        //var dto = { ...this.state.dto };
        //this.setState({ dto: dto });
        //console.log(dto);
        //Ok
        var dto = new CustomerDto;
        this.setState({ dto: dto });
        console.log(dto);
        this.searchClick();
        //Ok
        //this.setState(prevState => {
        //    let dto = { ...prevState.dto };
        //    dto.customerId = '';
        //    dto.name = '';
        //    dto.country = '';
        //    dto.city = '';
        //    dto.address = '';
        //    dto.state = '';
        //    dto.zip = '';
        //    return { dto, };
        //});
        //Ok
        //this.setState(prevState => {
        //let dto = new CustomerDto;
        //    return { dto, };
        //});
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
//# sourceMappingURL=Test.js.map