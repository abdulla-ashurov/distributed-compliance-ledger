import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "zigbeealliance.distributedcomplianceledger.compliance";
export interface ComplianceInformation {
    vid: number;
    pid: number;
    softwareVersion: number;
    certificationType: string;
}
export declare const ComplianceInformation: {
    encode(message: ComplianceInformation, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): ComplianceInformation;
    fromJSON(object: any): ComplianceInformation;
    toJSON(message: ComplianceInformation): unknown;
    fromPartial(object: DeepPartial<ComplianceInformation>): ComplianceInformation;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
