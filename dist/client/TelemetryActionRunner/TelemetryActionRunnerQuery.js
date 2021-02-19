"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryActionRunnerQuery = void 0;
var teletubby_pb_1 = require("../../grpc/teletubby_pb");
var Callsigns_1 = require("../Callsigns");
var PrefixLogger_1 = require("../PrefixLogger");
var TelemetryActionRunnerQuery = /** @class */ (function () {
    function TelemetryActionRunnerQuery() {
        var _this = this;
        this.run = function (actionType, sources, callsigns, grpcClient, metadata, subscriberId) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var self = _this;
            if (callsigns.lookupType === Callsigns_1.CallsignsLookupType.Query) {
                var lookupValue = callsigns.lookupValue;
                var req = new teletubby_pb_1.TelemetryQueryRequest();
                req.setSubscriberid(subscriberId);
                req.setSourcesList(sources);
                req.setOperation(actionType);
                var telemetryQuery = new teletubby_pb_1.Query();
                telemetryQuery.setOperation(lookupValue.operation);
                var queryOrPredicatesList_1 = [];
                lookupValue.predicates.forEach(function (callsignsPredicate) {
                    var queryOrPredicate = new teletubby_pb_1.QueryOrPredicate();
                    var predicate = new teletubby_pb_1.Predicate();
                    predicate.setAttribute(callsignsPredicate.attribute);
                    predicate.setOperation(callsignsPredicate.operation);
                    predicate.setValue(callsignsPredicate.value);
                    queryOrPredicate.setPredicate(predicate);
                    queryOrPredicatesList_1.push(queryOrPredicate);
                });
                telemetryQuery.setQueryorpredicatesList(queryOrPredicatesList_1);
                req.setCallsignquery(telemetryQuery);
                // Send the telemetry query request to back-end.
                grpcClient.requestTelemetryQuery(req, metadata, function (err, ack) {
                    if (err) {
                        self.logger.error('grpcClient.requestTelemetry Query', err);
                    }
                });
            }
        };
        this.logger = PrefixLogger_1.PrefixLogger.getInstance('TelemetryActionRunner');
    }
    return TelemetryActionRunnerQuery;
}());
exports.TelemetryActionRunnerQuery = TelemetryActionRunnerQuery;
