"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixLogger = void 0;
var loglevel_1 = __importDefault(require("loglevel"));
var loglevel_plugin_prefix_1 = __importDefault(require("loglevel-plugin-prefix"));
loglevel_plugin_prefix_1.default.reg(loglevel_1.default);
loglevel_plugin_prefix_1.default.apply(loglevel_1.default, {
    format: function (level, name, timestamp) {
        return "[" + timestamp + "] " + level.toUpperCase() + " " + name + ":";
    },
});
var PrefixLogger = /** @class */ (function () {
    function PrefixLogger() {
    }
    PrefixLogger.getInstance = function (name) {
        if (name) {
            return loglevel_1.default.getLogger(name);
        }
        return loglevel_1.default;
    };
    return PrefixLogger;
}());
exports.PrefixLogger = PrefixLogger;
