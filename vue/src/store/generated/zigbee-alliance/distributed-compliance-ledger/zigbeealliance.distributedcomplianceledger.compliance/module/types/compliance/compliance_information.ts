/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'zigbeealliance.distributedcomplianceledger.compliance'

export interface ComplianceInformation {
  softwareVersionString: string
  cDVersionNumber: number
  softwareVersionCertificationStatus: number
  history: string[]
  vid: number
  pid: number
  softwareVersion: number
  certificationType: string
}

const baseComplianceInformation: object = {
  softwareVersionString: '',
  cDVersionNumber: 0,
  softwareVersionCertificationStatus: 0,
  history: '',
  vid: 0,
  pid: 0,
  softwareVersion: 0,
  certificationType: ''
}

export const ComplianceInformation = {
  encode(message: ComplianceInformation, writer: Writer = Writer.create()): Writer {
    if (message.softwareVersionString !== '') {
      writer.uint32(10).string(message.softwareVersionString)
    }
    if (message.cDVersionNumber !== 0) {
      writer.uint32(16).uint64(message.cDVersionNumber)
    }
    if (message.softwareVersionCertificationStatus !== 0) {
      writer.uint32(24).uint64(message.softwareVersionCertificationStatus)
    }
    for (const v of message.history) {
      writer.uint32(34).string(v!)
    }
    if (message.vid !== 0) {
      writer.uint32(40).int32(message.vid)
    }
    if (message.pid !== 0) {
      writer.uint32(48).int32(message.pid)
    }
    if (message.softwareVersion !== 0) {
      writer.uint32(56).uint64(message.softwareVersion)
    }
    if (message.certificationType !== '') {
      writer.uint32(66).string(message.certificationType)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ComplianceInformation {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseComplianceInformation } as ComplianceInformation
    message.history = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.softwareVersionString = reader.string()
          break
        case 2:
          message.cDVersionNumber = longToNumber(reader.uint64() as Long)
          break
        case 3:
          message.softwareVersionCertificationStatus = longToNumber(reader.uint64() as Long)
          break
        case 4:
          message.history.push(reader.string())
          break
        case 5:
          message.vid = reader.int32()
          break
        case 6:
          message.pid = reader.int32()
          break
        case 7:
          message.softwareVersion = longToNumber(reader.uint64() as Long)
          break
        case 8:
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
    message.history = []
    if (object.softwareVersionString !== undefined && object.softwareVersionString !== null) {
      message.softwareVersionString = String(object.softwareVersionString)
    } else {
      message.softwareVersionString = ''
    }
    if (object.cDVersionNumber !== undefined && object.cDVersionNumber !== null) {
      message.cDVersionNumber = Number(object.cDVersionNumber)
    } else {
      message.cDVersionNumber = 0
    }
    if (object.softwareVersionCertificationStatus !== undefined && object.softwareVersionCertificationStatus !== null) {
      message.softwareVersionCertificationStatus = Number(object.softwareVersionCertificationStatus)
    } else {
      message.softwareVersionCertificationStatus = 0
    }
    if (object.history !== undefined && object.history !== null) {
      for (const e of object.history) {
        message.history.push(String(e))
      }
    }
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
    message.softwareVersionString !== undefined && (obj.softwareVersionString = message.softwareVersionString)
    message.cDVersionNumber !== undefined && (obj.cDVersionNumber = message.cDVersionNumber)
    message.softwareVersionCertificationStatus !== undefined && (obj.softwareVersionCertificationStatus = message.softwareVersionCertificationStatus)
    if (message.history) {
      obj.history = message.history.map((e) => e)
    } else {
      obj.history = []
    }
    message.vid !== undefined && (obj.vid = message.vid)
    message.pid !== undefined && (obj.pid = message.pid)
    message.softwareVersion !== undefined && (obj.softwareVersion = message.softwareVersion)
    message.certificationType !== undefined && (obj.certificationType = message.certificationType)
    return obj
  },

  fromPartial(object: DeepPartial<ComplianceInformation>): ComplianceInformation {
    const message = { ...baseComplianceInformation } as ComplianceInformation
    message.history = []
    if (object.softwareVersionString !== undefined && object.softwareVersionString !== null) {
      message.softwareVersionString = object.softwareVersionString
    } else {
      message.softwareVersionString = ''
    }
    if (object.cDVersionNumber !== undefined && object.cDVersionNumber !== null) {
      message.cDVersionNumber = object.cDVersionNumber
    } else {
      message.cDVersionNumber = 0
    }
    if (object.softwareVersionCertificationStatus !== undefined && object.softwareVersionCertificationStatus !== null) {
      message.softwareVersionCertificationStatus = object.softwareVersionCertificationStatus
    } else {
      message.softwareVersionCertificationStatus = 0
    }
    if (object.history !== undefined && object.history !== null) {
      for (const e of object.history) {
        message.history.push(e)
      }
    }
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

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
