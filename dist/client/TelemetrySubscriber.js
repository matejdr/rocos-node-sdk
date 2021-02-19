"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetrySubscriber = void 0;
var grpc_js_1 = require("@grpc/grpc-js");
var rxjs_1 = require("rxjs");
var PrefixLogger_1 = require("./PrefixLogger");
var CustomTelemetryMessage_1 = require("./CustomTelemetryMessage");
var Callsigns_1 = require("./Callsigns");
var TelemetryActionRunner_1 = require("./TelemetryActionRunner/TelemetryActionRunner");
var TelemetrySubscriber = /** @class */ (function () {
    function TelemetrySubscriber(projectId, sources, callsigns, token, grpcClient) {
        var _this = this;
        this.registerStreamReceiver = function () {
            _this.logger.info('registerStreamReceiver', _this);
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var self = _this;
            var call = _this.grpcClient.registerStreamReceiver(_this.metadata);
            call.on('data', function (msg) {
                var message = new CustomTelemetryMessage_1.CustomTelemetryMessage(msg);
                self.onData(message);
            });
            call.on('status', function (status) {
                self.logger.debug('registerStreamReceiver', 'status', status);
            });
            call.on('end', function (status) {
                self.logger.debug('registerStreamReceiver', 'end', status);
            });
            _this.activeCall = call;
            return function () {
                call.cancel();
            };
        };
        this.onData = function (message) {
            var source = message.source;
            var callsign = message.callsign;
            var isRobotMessage = true;
            message.projectId = _this.projectId;
            switch (source) {
                case '/rocos/agent/telemetry/subscribed':
                    var json = message.payload;
                    _this.subscriberId = json.subscriberId;
                    new TelemetryActionRunner_1.TelemetryActionRunner().run('subscribe', _this.sources, _this.callsigns, _this.grpcClient, _this.metadata, _this.subscriberId, _this.projectId);
                    isRobotMessage = false;
                    break;
                case '/rocos/agent/telemetry/noop':
                    isRobotMessage = false;
                    break;
                default:
                    isRobotMessage = true;
                    break;
            }
            if (_this.isRegisteredMessage(callsign, source)) {
                if (_this.subject) {
                    _this.subject.next(message);
                }
            }
            else {
                if (isRobotMessage) {
                    // All messages received should be subscribed.
                    _this.logger.error('onData', 'received unsubscribed message', {
                        callsign: callsign,
                        source: source,
                        callsigns: _this.callsigns,
                        sources: _this.sources,
                    });
                }
            }
        };
        this.isRegisteredMessage = function (callsign, source) {
            var isFoundSource = _this.sources.indexOf(source) !== -1;
            var isFoundCallsign;
            if (!(_this.callsigns.lookupValue instanceof Callsigns_1.CallsignsQuery)) {
                isFoundCallsign = _this.callsigns.lookupValue.indexOf(callsign) !== -1;
            }
            else {
                isFoundCallsign = true;
            }
            return isFoundCallsign && isFoundSource;
        };
        this.unsubscribe = function () {
            _this.logger.info('unsubscribe');
            new TelemetryActionRunner_1.TelemetryActionRunner().run('unsubscribe', _this.sources, _this.callsigns, _this.grpcClient, _this.metadata, _this.subscriberId, _this.projectId);
            if (_this.activeCall) {
                _this.activeCall.cancel();
                _this.activeCall = undefined;
            }
        };
        this.logger = PrefixLogger_1.PrefixLogger.getInstance('TelemetrySubscriber');
        this.projectId = token;
        this.sources = sources;
        this.callsigns = callsigns;
        this.grpcClient = grpcClient;
        this.subject = new rxjs_1.Subject();
        this.metadata = new grpc_js_1.Metadata();
        this.metadata.add('authorization', token);
        this.metadata.add('r-p', this.projectId);
        this.registerStreamReceiver();
    }
    return TelemetrySubscriber;
}());
exports.TelemetrySubscriber = TelemetrySubscriber;
