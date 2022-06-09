import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "zigbeealliance.distributedcomplianceledger.compliance";
export interface ComplianceInfoIndex {
    vid: number;
    pid: number;
    softwareVersion: number;
    certificationType: string;
}
export declare const ComplianceInfoIndex: {
    encode(message: ComplianceInfoIndex, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): ComplianceInfoIndex;
    fromJSON(object: any): ComplianceInfoIndex;
    toJSON(message: ComplianceInfoIndex): unknown;
    fromPartial(object: DeepPartial<ComplianceInfoIndex>): ComplianceInfoIndex;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
