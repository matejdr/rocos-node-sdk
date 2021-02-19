export declare enum CallsignsLookupType {
    Query = 0,
    List = 1
}
export declare enum LogicalOperation {
    Or = 0
}
export declare enum CallsignsQueryPredicateAttribute {
    Tag = 0
}
export declare enum ComparisonOperation {
    Equal = 0
}
export declare class CallsignsQuery {
    operation: LogicalOperation;
    predicates: CallsignsQueryPredicate[];
    constructor(operation: LogicalOperation, predicates: CallsignsQueryPredicate[]);
}
export declare class CallsignsQueryPredicate {
    attribute: CallsignsQueryPredicateAttribute;
    operation: ComparisonOperation;
    value: string;
    constructor(attribute: CallsignsQueryPredicateAttribute, operation: ComparisonOperation, value: string);
}
export declare class CallsignsLookup {
    lookupValue: CallsignsQuery | string[];
    lookupType: CallsignsLookupType;
    constructor(lookupValue: string[] | CallsignsQuery);
}
