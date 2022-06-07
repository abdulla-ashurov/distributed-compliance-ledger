/* eslint-disable */
import { ComplianceInformation } from '../compliance/compliance_information';
import { Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'zigbeealliance.distributedcomplianceledger.compliance';
const baseDeviceSoftwareCompliance = { CDCertificateID: '' };
export const DeviceSoftwareCompliance = {
    encode(message, writer = Writer.create()) {
        if (message.CDCertificateID !== '') {
            writer.uint32(10).string(message.CDCertificateID);
        }
        for (const v of message.complianceInformation) {
            ComplianceInformation.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseDeviceSoftwareCompliance };
        message.complianceInformation = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.CDCertificateID = reader.string();
                    break;
                case 2:
                    message.complianceInformation.push(ComplianceInformation.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseDeviceSoftwareCompliance };
        message.complianceInformation = [];
        if (object.CDCertificateID !== undefined && object.CDCertificateID !== null) {
            message.CDCertificateID = String(object.CDCertificateID);
        }
        else {
            message.CDCertificateID = '';
        }
        if (object.complianceInformation !== undefined && object.complianceInformation !== null) {
            for (const e of object.complianceInformation) {
                message.complianceInformation.push(ComplianceInformation.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.CDCertificateID !== undefined && (obj.CDCertificateID = message.CDCertificateID);
        if (message.complianceInformation) {
            obj.complianceInformation = message.complianceInformation.map((e) => (e ? ComplianceInformation.toJSON(e) : undefined));
        }
        else {
            obj.complianceInformation = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseDeviceSoftwareCompliance };
        message.complianceInformation = [];
        if (object.CDCertificateID !== undefined && object.CDCertificateID !== null) {
            message.CDCertificateID = object.CDCertificateID;
        }
        else {
            message.CDCertificateID = '';
        }
        if (object.complianceInformation !== undefined && object.complianceInformation !== null) {
            for (const e of object.complianceInformation) {
                message.complianceInformation.push(ComplianceInformation.fromPartial(e));
            }
        }
        return message;
    }
};
