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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryError = exports.errorCodes = void 0;
exports.errorCodes = {
    STREAM_ERROR: 'STREAM_ERROR',
    SUBSCRIBER_ERROR: 'SUBSCRIBER_ERROR',
    CLIENT_ERROR: 'CLIENT_ERROR',
    GRPC_CLIENT_ERROR: 'GRPC_CLIENT_ERROR',
};
var TelemetryError = /** @class */ (function (_super) {
    __extends(TelemetryError, _super);
    function TelemetryError(code, err) {
        var _this = this;
        if (err instanceof Error) {
            _this = _super.call(this, err.message) || this;
            _this.name = err.name;
            _this.stack = err.stack;
        }
        else {
            _this = _super.call(this, err) || this;
        }
        _this.code = code;
        return _this;
    }
    TelemetryError.createFromGrpcClient = function (code, err) {
        var error = new TelemetryError(code, err.message);
        error.name = err.name;
        error.stack = err.stack;
        error.extraData = {
            code: err.code,
            details: err.details,
            metadata: err.metadata,
        };
        return error;
    };
    return TelemetryError;
}(Error));
exports.TelemetryError = TelemetryError;
