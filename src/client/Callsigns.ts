// This is basically a repeat of types in teletubby_pb stubs.
// Not sure if it makes sense to have 2 lookups.

export enum CallsignsLookupType {
  Query = 0,
  List = 1,
}
export declare enum LogicalOperation {
  Or = 0,
}
export declare enum CallsignsQueryPredicateAttribute {
  Tag = 0,
}
export declare enum ComparisonOperation {
  Equal = 0,
}

export class CallsignsQuery {
  operation: LogicalOperation
  predicates: CallsignsQueryPredicate[]

  constructor(
    operation: LogicalOperation,
    predicates: CallsignsQueryPredicate[]
  ) {
    this.operation = operation
    this.predicates = predicates
  }
}

export class CallsignsQueryPredicate {
  attribute: CallsignsQueryPredicateAttribute
  operation: ComparisonOperation
  value: string

  constructor(
    attribute: CallsignsQueryPredicateAttribute,
    operation: ComparisonOperation,
    value: string
  ) {
    this.attribute = attribute
    this.operation = operation
    this.value = value
  }
}

export class CallsignsLookup {
  lookupValue: CallsignsQuery | string[]
  lookupType: CallsignsLookupType
  constructor(lookupValue: string[] | CallsignsQuery) {
    this.lookupValue = lookupValue
    if (lookupValue instanceof CallsignsQuery) {
      this.lookupType = CallsignsLookupType.Query
    } else {
      this.lookupType = CallsignsLookupType.List
      if (!lookupValue) {
        this.lookupValue = []
      }
    }
  }
}
