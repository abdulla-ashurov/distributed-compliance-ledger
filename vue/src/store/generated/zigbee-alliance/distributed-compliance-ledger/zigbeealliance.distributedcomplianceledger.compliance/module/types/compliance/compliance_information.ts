/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'zigbeealliance.distributedcomplianceledger.compliance'

export interface ComplianceInformation {
  vid: number
  pid: number
  softwareVersion: number
  certificationType: string
}

const baseComplianceInformation: object = { vid: 0, pid: 0, softwareVersion: 0, certificationType: '' }

export const ComplianceInformation = {
  encode(message: ComplianceInformation, writer: Writer = Writer.create()): Writer {
    if (message.vid !== 0) {
      writer.uint32(8).int32(message.vid)
    }
    if (message.pid !== 0) {
      writer.uint32(16).int32(message.pid)
    }
    if (message.softwareVersion !== 0) {
      writer.uint32(24).uint32(message.softwareVersion)
    }
    if (message.certificationType !== '') {
      writer.uint32(34).string(message.certificationType)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ComplianceInformation {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseComplianceInformation } as ComplianceInformation
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.vid = reader.int32()
          break
        case 2:
          message.pid = reader.int32()
          break
        case 3:
          message.softwareVersion = reader.uint32()
          break
        case 4:
          message.certificationType = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): ComplianceInformation {
    const message = { ...baseComplianceInformation } as ComplianceInformation
    if (object.vid !== undefined && object.vid !== null) {
      message.vid = Number(object.vid)
    } else {
      message.vid = 0
    }
    if (object.pid !== undefined && object.pid !== null) {
      message.pid = Number(object.pid)
    } else {
      message.pid = 0
    }
    if (object.softwareVersion !== undefined && object.softwareVersion !== null) {
      message.softwareVersion = Number(object.softwareVersion)
    } else {
      message.softwareVersion = 0
    }
    if (object.certificationType !== undefined && object.certificationType !== null) {
      message.certificationType = String(object.certificationType)
    } else {
      message.certificationType = ''
    }
    return message
  },

  toJSON(message: ComplianceInformation): unknown {
    const obj: any = {}
    message.vid !== undefined && (obj.vid = message.vid)
    message.pid !== undefined && (obj.pid = message.pid)
    message.softwareVersion !== undefined && (obj.softwareVersion = message.softwareVersion)
    message.certificationType !== undefined && (obj.certificationType = message.certificationType)
    return obj
  },

  fromPartial(object: DeepPartial<ComplianceInformation>): ComplianceInformation {
    const message = { ...baseComplianceInformation } as ComplianceInformation
    if (object.vid !== undefined && object.vid !== null) {
      message.vid = object.vid
    } else {
      message.vid = 0
    }
    if (object.pid !== undefined && object.pid !== null) {
      message.pid = object.pid
    } else {
      message.pid = 0
    }
    if (object.softwareVersion !== undefined && object.softwareVersion !== null) {
      message.softwareVersion = object.softwareVersion
    } else {
      message.softwareVersion = 0
    }
    if (object.certificationType !== undefined && object.certificationType !== null) {
      message.certificationType = object.certificationType
    } else {
      message.certificationType = ''
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
