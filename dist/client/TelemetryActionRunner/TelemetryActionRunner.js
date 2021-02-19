"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryActionRunner = void 0;
var Callsigns_1 = require("../Callsigns");
var PrefixLogger_1 = require("../PrefixLogger");
var TelemetryActionRunnerList_1 = require("./TelemetryActionRunnerList");
var TelemetryActionRunnerQuery_1 = require("./TelemetryActionRunnerQuery");
var TelemetryActionRunner = /** @class */ (function () {
    function TelemetryActionRunner() {
        var _this = this;
        this.run = function (actionType, sources, callsigns, grpcClient, metadata, subscriberId, projectId) {
            if (!subscriberId || !projectId) {
                _this.logger.warn(actionType, 'without subscriberId or projectId - message will not send out', {
                    subscriberId: subscriberId,
                    projectId: projectId,
                });
                return;
            }
            if (callsigns.lookupType === Callsigns_1.CallsignsLookupType.List) {
                new TelemetryActionRunnerList_1.TelemetryActionRunnerList().run(actionType, sources, callsigns, grpcClient, metadata, subscriberId);
            }
            else if (callsigns.lookupType === Callsigns_1.CallsignsLookupType.Query) {
                new TelemetryActionRunnerQuery_1.TelemetryActionRunnerQuery().run(actionType, sources, callsigns, grpcClient, metadata, subscriberId);
            }
            _this.logger.debug(actionType, 'grpcClient.requestTelemetry', subscriberId);
        };
        this.logger = PrefixLogger_1.PrefixLogger.getInstance('TelemetryAction');
    }
    return TelemetryActionRunner;
}());
exports.TelemetryActionRunner = TelemetryActionRunner;
