"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropDownListHelper = exports.DropDownEnum = void 0;
var DropDownEnum = /** @class */ (function () {
    function DropDownEnum() {
        this.country = [];
        this.state = [];
        this.city = [];
        this.zip = [];
    }
    return DropDownEnum;
}());
exports.DropDownEnum = DropDownEnum;
var DropDownListHelper = /** @class */ (function () {
    function DropDownListHelper() {
    }
    DropDownListHelper.prototype.findCountryDistinct = function (customers) {
        var countries = new Set(customers.map(function (data) { return data.country; }));
        return Array.from(countries);
    };
    DropDownListHelper.prototype.findStateDistinct = function (selected, customers) {
        var states = new Set(customers.filter(function (c) { return c.country == selected.country; }).map(function (c) { return c.state; }));
        return Array.from(states);
    };
    DropDownListHelper.prototype.findCityDistinct = function (selected, customers) {
        var cities = new Set(customers.filter(function (c) { return c.country == selected.country; }).filter(function (c) { return c.state == selected.state; }).map(function (c) { return c.city; }));
        return Array.from(cities);
    };
    DropDownListHelper.prototype.findZipDistinct = function (selected, customers) {
        var zips = new Set(customers.filter(function (c) { return c.country == selected.country; }).filter(function (c) { return c.state == selected.state; }).filter(function (c) { return c.city == selected.city; }).map(function (c) { return c.zip; }));
        return Array.from(zips);
    };
    return DropDownListHelper;
}());
exports.DropDownListHelper = DropDownListHelper;
//# sourceMappingURL=DropDownListHelper.js.map