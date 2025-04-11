"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentType = exports.ApartmentStatus = void 0;
var ApartmentStatus;
(function (ApartmentStatus) {
    ApartmentStatus["RENT"] = "rent";
    ApartmentStatus["SALE"] = "sale";
})(ApartmentStatus || (exports.ApartmentStatus = ApartmentStatus = {}));
var ApartmentType;
(function (ApartmentType) {
    ApartmentType["VILLA"] = "villa";
    ApartmentType["CHALET"] = "chalet";
    ApartmentType["APARTMENT"] = "apartment";
})(ApartmentType || (exports.ApartmentType = ApartmentType = {}));
