"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryActionRunnerList = void 0;
var teletubby_pb_1 = require("../../grpc/teletubby_pb");
var Callsigns_1 = require("../Callsigns");
var PrefixLogger_1 = require("../PrefixLogger");
var TelemetryError_1 = require("../TelemetryError");
var TelemetryActionRunnerList = /** @class */ (function () {
    function TelemetryActionRunnerList() {
        var _this = this;
        this.run = function (actionType, sources, callsigns, grpcClient, metadata, subscriberId, subject) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var self = _this;
            if (callsigns.lookupType === Callsigns_1.CallsignsLookupType.List) {
                var lookupValue = callsigns.lookupValue;
                var req = new teletubby_pb_1.TelemetryRequest();
                var actions = [];
                var action = new teletubby_pb_1.TelemetryAction();
                action.setOperation(actionType);
                action.setCallsignsList(lookupValue);
                action.setSourcesList(sources);
                actions.push(action);
                req.setRequestedactionsList(actions);
                req.setSubscriberid(subscriberId);
                // Send the message to back-end.
                grpcClient.requestTelemetry(req, metadata, function (err, ack) {
                    if (err) {
                        self.logger.error('grpcClient.requestTelemetry List', err);
                        subject.error(TelemetryError_1.TelemetryError.createFromGrpcClient(TelemetryError_1.errorCodes.GRPC_CLIENT_ERROR, err));
                    }
                });
            }
        };
        this.logger = PrefixLogger_1.PrefixLogger.getInstance('TelemetryAction');
    }
    return TelemetryActionRunnerList;
}());
exports.TelemetryActionRunnerList = TelemetryActionRunnerList;
