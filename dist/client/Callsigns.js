"use strict";
// This is basically a repeat of types in teletubby_pb stubs.
// Not sure if it makes sense to have 2 lookups.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallsignsLookup = exports.CallsignsQueryPredicate = exports.CallsignsQuery = exports.CallsignsLookupType = void 0;
var CallsignsLookupType;
(function (CallsignsLookupType) {
    CallsignsLookupType[CallsignsLookupType["Query"] = 0] = "Query";
    CallsignsLookupType[CallsignsLookupType["List"] = 1] = "List";
})(CallsignsLookupType = exports.CallsignsLookupType || (exports.CallsignsLookupType = {}));
var CallsignsQuery = /** @class */ (function () {
    function CallsignsQuery(operation, predicates) {
        this.operation = operation;
        this.predicates = predicates;
    }
    return CallsignsQuery;
}());
exports.CallsignsQuery = CallsignsQuery;
var CallsignsQueryPredicate = /** @class */ (function () {
    function CallsignsQueryPredicate(attribute, operation, value) {
        this.attribute = attribute;
        this.operation = operation;
        this.value = value;
    }
    return CallsignsQueryPredicate;
}());
exports.CallsignsQueryPredicate = CallsignsQueryPredicate;
var CallsignsLookup = /** @class */ (function () {
    function CallsignsLookup(lookupValue) {
        this.lookupValue = lookupValue;
        if (lookupValue instanceof CallsignsQuery) {
            this.lookupType = CallsignsLookupType.Query;
        }
        else {
            this.lookupType = CallsignsLookupType.List;
            if (!lookupValue) {
                this.lookupValue = [];
            }
        }
    }
    return CallsignsLookup;
}());
exports.CallsignsLookup = CallsignsLookup;
