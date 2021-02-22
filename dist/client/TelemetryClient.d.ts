import { LogLevelDesc } from 'loglevel';
import { TelemetrySubscriber } from './TelemetrySubscriber';
import { CallsignsQuery } from './Callsigns';
export declare class TelemetryClient {
    private logger;
    private readonly token;
    private readonly grpcClient;
    private subscribers;
    /**
     * Create a new Telemetry client wuth a service hostnamre and a token
     *
     * @param hostname - Hostname of the stream service.
     * @param token - The token for authorization.
     *
     * @beta
     */
    constructor(hostname: string, token: string);
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
    subscribe: (projectId: string, callsigns: string[] | CallsignsQuery, sources: Array<string>) => TelemetrySubscriber;
    /**
     * Unsubscribe a telemetry event.
     *
     * @param sub - TelemetrySubscriber
     * @returns void
     *
     * @beta
     */
    unsubscribe: (sub: TelemetrySubscriber) => void;
    /**
     * Unsubscribe all telemetry events.
     *
     * @returns void
     *
     * @beta
     */
    unsubscribeAll: () => void;
    enableDebugMode: (on?: boolean) => void;
    setDebugLevel: (level: LogLevelDesc) => void;
}
