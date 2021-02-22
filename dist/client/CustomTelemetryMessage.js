"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTelemetryMessage = void 0;
var CustomTelemetryMessage = /** @class */ (function () {
    function CustomTelemetryMessage(msg) {
        this.callsign = msg.getCallsign();
        this.source = msg.getSource();
        this.type = 'json';
        this.payload = msg.getPayload_asB64()
            ? JSON.parse(msg.getPayload_asB64())
            : undefined;
        this.createdAt = msg.getCreated();
        this.receivedAt = new Date();
    }
    return CustomTelemetryMessage;
}());
exports.CustomTelemetryMessage = CustomTelemetryMessage;
