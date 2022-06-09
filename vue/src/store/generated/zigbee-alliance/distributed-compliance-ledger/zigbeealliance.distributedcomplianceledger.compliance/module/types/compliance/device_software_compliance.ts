/* eslint-disable */
import { ComplianceInfoIndex } from '../compliance/compliance_info_index'
import { Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'zigbeealliance.distributedcomplianceledger.compliance'

export interface DeviceSoftwareCompliance {
  CDCertificateID: string
  complianceInfoIndex: ComplianceInfoIndex[]
}

const baseDeviceSoftwareCompliance: object = { CDCertificateID: '' }

export const DeviceSoftwareCompliance = {
  encode(message: DeviceSoftwareCompliance, writer: Writer = Writer.create()): Writer {
    if (message.CDCertificateID !== '') {
      writer.uint32(10).string(message.CDCertificateID)
    }
    for (const v of message.complianceInfoIndex) {
      ComplianceInfoIndex.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): DeviceSoftwareCompliance {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseDeviceSoftwareCompliance } as DeviceSoftwareCompliance
    message.complianceInfoIndex = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.CDCertificateID = reader.string()
          break
        case 2:
          message.complianceInfoIndex.push(ComplianceInfoIndex.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): DeviceSoftwareCompliance {
    const message = { ...baseDeviceSoftwareCompliance } as DeviceSoftwareCompliance
    message.complianceInfoIndex = []
    if (object.CDCertificateID !== undefined && object.CDCertificateID !== null) {
      message.CDCertificateID = String(object.CDCertificateID)
    } else {
      message.CDCertificateID = ''
    }
    if (object.complianceInfoIndex !== undefined && object.complianceInfoIndex !== null) {
      for (const e of object.complianceInfoIndex) {
        message.complianceInfoIndex.push(ComplianceInfoIndex.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: DeviceSoftwareCompliance): unknown {
    const obj: any = {}
    message.CDCertificateID !== undefined && (obj.CDCertificateID = message.CDCertificateID)
    if (message.complianceInfoIndex) {
      obj.complianceInfoIndex = message.complianceInfoIndex.map((e) => (e ? ComplianceInfoIndex.toJSON(e) : undefined))
    } else {
      obj.complianceInfoIndex = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<DeviceSoftwareCompliance>): DeviceSoftwareCompliance {
    const message = { ...baseDeviceSoftwareCompliance } as DeviceSoftwareCompliance
    message.complianceInfoIndex = []
    if (object.CDCertificateID !== undefined && object.CDCertificateID !== null) {
      message.CDCertificateID = object.CDCertificateID
    } else {
      message.CDCertificateID = ''
    }
    if (object.complianceInfoIndex !== undefined && object.complianceInfoIndex !== null) {
      for (const e of object.complianceInfoIndex) {
        message.complianceInfoIndex.push(ComplianceInfoIndex.fromPartial(e))
      }
    }
    return message
  }
}

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>
