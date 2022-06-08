/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'zigbeealliance.distributedcomplianceledger.compliance'

export interface DeviceSoftwareCompliance {
  cDCertificateID: string
  complianceInformation: string[]
}

const baseDeviceSoftwareCompliance: object = { cDCertificateID: '', complianceInformation: '' }

export const DeviceSoftwareCompliance = {
  encode(message: DeviceSoftwareCompliance, writer: Writer = Writer.create()): Writer {
    if (message.cDCertificateID !== '') {
      writer.uint32(10).string(message.cDCertificateID)
    }
    for (const v of message.complianceInformation) {
      writer.uint32(18).string(v!)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): DeviceSoftwareCompliance {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseDeviceSoftwareCompliance } as DeviceSoftwareCompliance
    message.complianceInformation = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.cDCertificateID = reader.string()
          break
        case 2:
          message.complianceInformation.push(reader.string())
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
    message.complianceInformation = []
    if (object.cDCertificateID !== undefined && object.cDCertificateID !== null) {
      message.cDCertificateID = String(object.cDCertificateID)
    } else {
      message.cDCertificateID = ''
    }
    if (object.complianceInformation !== undefined && object.complianceInformation !== null) {
      for (const e of object.complianceInformation) {
        message.complianceInformation.push(String(e))
      }
    }
    return message
  },

  toJSON(message: DeviceSoftwareCompliance): unknown {
    const obj: any = {}
    message.cDCertificateID !== undefined && (obj.cDCertificateID = message.cDCertificateID)
    if (message.complianceInformation) {
      obj.complianceInformation = message.complianceInformation.map((e) => e)
    } else {
      obj.complianceInformation = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<DeviceSoftwareCompliance>): DeviceSoftwareCompliance {
    const message = { ...baseDeviceSoftwareCompliance } as DeviceSoftwareCompliance
    message.complianceInformation = []
    if (object.cDCertificateID !== undefined && object.cDCertificateID !== null) {
      message.cDCertificateID = object.cDCertificateID
    } else {
      message.cDCertificateID = ''
    }
    if (object.complianceInformation !== undefined && object.complianceInformation !== null) {
      for (const e of object.complianceInformation) {
        message.complianceInformation.push(e)
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
