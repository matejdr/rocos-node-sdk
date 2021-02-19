"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryClient = void 0;
var PrefixLogger_1 = require("./PrefixLogger");
var teletubby_grpc_pb_1 = require("../grpc/teletubby_grpc_pb");
var TelemetrySubscriber_1 = require("./TelemetrySubscriber");
var Callsigns_1 = require("./Callsigns");
var grpc = __importStar(require("@grpc/grpc-js"));
var TelemetryClient = /** @class */ (function () {
    function TelemetryClient(hostname, token) {
        var _this = this;
        this.subscribers = [];
        this.subscribe = function (projectId, callsigns, sources) {
            if (!_this.grpcClient) {
                _this.logger.error('client does not exist');
                return;
            }
            _this.logger.info('subscribe with callsigns');
            var sub = new TelemetrySubscriber_1.TelemetrySubscriber(projectId, sources, new Callsigns_1.CallsignsLookup(callsigns), _this.token, _this.grpcClient);
            _this.logger.debug('subscribing', sub);
            _this.subscribers.push(sub);
            return sub;
        };
        this.unsubscribe = function (sub) {
            _this.logger.info('unsubscribing', sub);
            var foundSubscriber = _this.subscribers.indexOf(sub);
            if (foundSubscriber >= 0) {
                _this.subscribers[foundSubscriber].unsubscribe();
            }
            else {
                _this.logger.warn('subscriber not found');
            }
        };
        this.unsubscribeAll = function () {
            _this.logger.info('unsubscribing all');
            _this.subscribers.forEach(function (subscriber) {
                subscriber.unsubscribe();
            });
        };
        this.enableDebugMode = function (on) {
            if (on === void 0) { on = true; }
            if (on) {
                _this.logger.enableAll();
            }
            else {
                _this.logger.disableAll();
            }
        };
        this.setDebugLevel = function (level) {
            _this.logger.setLevel(level);
        };
        this.logger = PrefixLogger_1.PrefixLogger.getInstance('TelemetryClient');
        this.token = token;
        try {
            this.grpcClient = new teletubby_grpc_pb_1.TelemetryReceiverClient(hostname, 
            // TODO: do not know how you do authentication
            grpc.credentials.createInsecure());
        }
        catch (e) {
            this.logger.error('client can not be created');
            this.logger.debug(e);
        }
    }
    return TelemetryClient;
}());
exports.TelemetryClient = TelemetryClient;
