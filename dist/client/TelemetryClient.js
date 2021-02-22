"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryClient = void 0;
var grpc_js_1 = require("@grpc/grpc-js");
var PrefixLogger_1 = require("./PrefixLogger");
var teletubby_grpc_pb_1 = require("../grpc/teletubby_grpc_pb");
var TelemetrySubscriber_1 = require("./TelemetrySubscriber");
var Callsigns_1 = require("./Callsigns");
var TelemetryError_1 = require("./TelemetryError");
var TelemetryClient = /** @class */ (function () {
    /**
     * Create a new Telemetry client wuth a service hostnamre and a token
     *
     * @param hostname - Hostname of the stream service.
     * @param token - The token for authorization.
     *
     * @beta
     */
    function TelemetryClient(hostname, token) {
        var _this = this;
        this.subscribers = [];
        /**
         * Subscribe to telemetry events.
         *
         * @remarks
         * This is the main method for connecting service data to your application.
         *
         * @param projectId - id of the project
         * @param callsigns - An array of string callsigns or a callsign query
         * @param sources - An array of string sources
         * @returns The TelemetrySubscriber or nothing if an error occurs.
         *
         * @beta
         */
        this.subscribe = function (projectId, callsigns, sources) {
            _this.logger.info('subscribe with callsigns');
            if (!_this.grpcClient) {
                _this.logger.error('client does not exist');
                throw new TelemetryError_1.TelemetryError(TelemetryError_1.errorCodes.CLIENT_ERROR, 'client does not exist');
            }
            var sub = new TelemetrySubscriber_1.TelemetrySubscriber(projectId, sources, new Callsigns_1.CallsignsLookup(callsigns), _this.token, _this.grpcClient);
            _this.logger.debug('subscribing', sub);
            _this.subscribers.push(sub);
            return sub;
        };
        /**
         * Unsubscribe a telemetry event.
         *
         * @param sub - TelemetrySubscriber
         * @returns void
         *
         * @beta
         */
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
        /**
         * Unsubscribe all telemetry events.
         *
         * @returns void
         *
         * @beta
         */
        this.unsubscribeAll = function () {
            _this.logger.info('unsubscribing all');
            _this.subscribers.forEach(function (subscriber) {
                subscriber.unsubscribe();
            });
        };
        this.enableDebugMode = function (on) {
            if (on === void 0) { on = true; }
            if (on) {
                PrefixLogger_1.PrefixLogger.enableAll();
            }
            else {
                PrefixLogger_1.PrefixLogger.disableAll();
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
            grpc_js_1.credentials.createInsecure());
        }
        catch (e) {
            this.logger.error('client can not be created');
            this.logger.debug(e);
            throw TelemetryError_1.TelemetryError.createFromError(TelemetryError_1.errorCodes.CLIENT_ERROR, e);
        }
    }
    return TelemetryClient;
}());
exports.TelemetryClient = TelemetryClient;
