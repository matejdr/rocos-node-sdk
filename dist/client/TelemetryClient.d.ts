import { LogLevelDesc } from 'loglevel';
import { TelemetrySubscriber } from './TelemetrySubscriber';
import { CallsignsQuery } from './Callsigns';
export declare class TelemetryClient {
    private logger;
    private token;
    private grpcClient;
    private subscribers;
    constructor(hostname: string, token: string);
    subscribe: (projectId: string, callsigns: string[] | CallsignsQuery, sources: Array<string>) => TelemetrySubscriber | undefined;
    unsubscribe: (sub: TelemetrySubscriber) => void;
    unsubscribeAll: () => void;
    enableDebugMode: (on?: boolean) => void;
    setDebugLevel: (level: LogLevelDesc) => void;
}
