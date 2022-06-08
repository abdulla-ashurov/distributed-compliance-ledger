/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal'

export const protobufPackage = 'zigbeealliance.distributedcomplianceledger.compliance'

export interface MsgCertifyModel {
  signer: string
  vid: number
  pid: number
  softwareVersion: number
  softwareVersionString: string
  cDVersionNumber: number
  certificationDate: string
  certificationType: string
  reason: string
  CDCertificateID: string
}

export interface MsgCertifyModelResponse {}

export interface MsgRevokeModel {
  signer: string
  vid: number
  pid: number
  softwareVersion: number
  softwareVersionString: string
  cDVersionNumber: number
  revocationDate: string
  certificationType: string
  reason: string
}

export interface MsgRevokeModelResponse {}

export interface MsgProvisionModel {
  signer: string
  vid: number
  pid: number
  softwareVersion: number
  softwareVersionString: string
  cDVersionNumber: number
  provisionalDate: string
  certificationType: string
  reason: string
}

export interface MsgProvisionModelResponse {}

const baseMsgCertifyModel: object = {
  signer: '',
  vid: 0,
  pid: 0,
  softwareVersion: 0,
  softwareVersionString: '',
  cDVersionNumber: 0,
  certificationDate: '',
  certificationType: '',
  reason: '',
  CDCertificateID: ''
}

export const MsgCertifyModel = {
  encode(message: MsgCertifyModel, writer: Writer = Writer.create()): Writer {
    if (message.signer !== '') {
      writer.uint32(10).string(message.signer)
    }
    if (message.vid !== 0) {
      writer.uint32(16).int32(message.vid)
    }
    if (message.pid !== 0) {
      writer.uint32(24).int32(message.pid)
    }
    if (message.softwareVersion !== 0) {
      writer.uint32(32).uint32(message.softwareVersion)
    }
    if (message.softwareVersionString !== '') {
      writer.uint32(42).string(message.softwareVersionString)
    }
    if (message.cDVersionNumber !== 0) {
      writer.uint32(48).uint32(message.cDVersionNumber)
    }
    if (message.certificationDate !== '') {
      writer.uint32(58).string(message.certificationDate)
    }
    if (message.certificationType !== '') {
      writer.uint32(66).string(message.certificationType)
    }
    if (message.reason !== '') {
      writer.uint32(74).string(message.reason)
    }
    if (message.CDCertificateID !== '') {
      writer.uint32(82).string(message.CDCertificateID)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCertifyModel {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCertifyModel } as MsgCertifyModel
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string()
          break
        case 2:
          message.vid = reader.int32()
          break
        case 3:
          message.pid = reader.int32()
          break
        case 4:
          message.softwareVersion = reader.uint32()
          break
        case 5:
          message.softwareVersionString = reader.string()
          break
        case 6:
          message.cDVersionNumber = reader.uint32()
          break
        case 7:
          message.certificationDate = reader.string()
          break
        case 8:
          message.certificationType = reader.string()
          break
        case 9:
          message.reason = reader.string()
          break
        case 10:
          message.CDCertificateID = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCertifyModel {
    const message = { ...baseMsgCertifyModel } as MsgCertifyModel
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = String(object.signer)
    } else {
      message.signer = ''
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
    if (object.certificationDate !== undefined && object.certificationDate !== null) {
      message.certificationDate = String(object.certificationDate)
    } else {
      message.certificationDate = ''
    }
    if (object.certificationType !== undefined && object.certificationType !== null) {
      message.certificationType = String(object.certificationType)
    } else {
      message.certificationType = ''
    }
    if (object.reason !== undefined && object.reason !== null) {
      message.reason = String(object.reason)
    } else {
      message.reason = ''
    }
    if (object.CDCertificateID !== undefined && object.CDCertificateID !== null) {
      message.CDCertificateID = String(object.CDCertificateID)
    } else {
      message.CDCertificateID = ''
    }
    return message
  },

  toJSON(message: MsgCertifyModel): unknown {
    const obj: any = {}
    message.signer !== undefined && (obj.signer = message.signer)
    message.vid !== undefined && (obj.vid = message.vid)
    message.pid !== undefined && (obj.pid = message.pid)
    message.softwareVersion !== undefined && (obj.softwareVersion = message.softwareVersion)
    message.softwareVersionString !== undefined && (obj.softwareVersionString = message.softwareVersionString)
    message.cDVersionNumber !== undefined && (obj.cDVersionNumber = message.cDVersionNumber)
    message.certificationDate !== undefined && (obj.certificationDate = message.certificationDate)
    message.certificationType !== undefined && (obj.certificationType = message.certificationType)
    message.reason !== undefined && (obj.reason = message.reason)
    message.CDCertificateID !== undefined && (obj.CDCertificateID = message.CDCertificateID)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCertifyModel>): MsgCertifyModel {
    const message = { ...baseMsgCertifyModel } as MsgCertifyModel
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer
    } else {
      message.signer = ''
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
    if (object.certificationDate !== undefined && object.certificationDate !== null) {
      message.certificationDate = object.certificationDate
    } else {
      message.certificationDate = ''
    }
    if (object.certificationType !== undefined && object.certificationType !== null) {
      message.certificationType = object.certificationType
    } else {
      message.certificationType = ''
    }
    if (object.reason !== undefined && object.reason !== null) {
      message.reason = object.reason
    } else {
      message.reason = ''
    }
    if (object.CDCertificateID !== undefined && object.CDCertificateID !== null) {
      message.CDCertificateID = object.CDCertificateID
    } else {
      message.CDCertificateID = ''
    }
    return message
  }
}

const baseMsgCertifyModelResponse: object = {}

export const MsgCertifyModelResponse = {
  encode(_: MsgCertifyModelResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCertifyModelResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCertifyModelResponse } as MsgCertifyModelResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgCertifyModelResponse {
    const message = { ...baseMsgCertifyModelResponse } as MsgCertifyModelResponse
    return message
  },

  toJSON(_: MsgCertifyModelResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgCertifyModelResponse>): MsgCertifyModelResponse {
    const message = { ...baseMsgCertifyModelResponse } as MsgCertifyModelResponse
    return message
  }
}

const baseMsgRevokeModel: object = {
  signer: '',
  vid: 0,
  pid: 0,
  softwareVersion: 0,
  softwareVersionString: '',
  cDVersionNumber: 0,
  revocationDate: '',
  certificationType: '',
  reason: ''
}

export const MsgRevokeModel = {
  encode(message: MsgRevokeModel, writer: Writer = Writer.create()): Writer {
    if (message.signer !== '') {
      writer.uint32(10).string(message.signer)
    }
    if (message.vid !== 0) {
      writer.uint32(16).int32(message.vid)
    }
    if (message.pid !== 0) {
      writer.uint32(24).int32(message.pid)
    }
    if (message.softwareVersion !== 0) {
      writer.uint32(32).uint32(message.softwareVersion)
    }
    if (message.softwareVersionString !== '') {
      writer.uint32(42).string(message.softwareVersionString)
    }
    if (message.cDVersionNumber !== 0) {
      writer.uint32(48).uint32(message.cDVersionNumber)
    }
    if (message.revocationDate !== '') {
      writer.uint32(58).string(message.revocationDate)
    }
    if (message.certificationType !== '') {
      writer.uint32(66).string(message.certificationType)
    }
    if (message.reason !== '') {
      writer.uint32(74).string(message.reason)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRevokeModel {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRevokeModel } as MsgRevokeModel
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string()
          break
        case 2:
          message.vid = reader.int32()
          break
        case 3:
          message.pid = reader.int32()
          break
        case 4:
          message.softwareVersion = reader.uint32()
          break
        case 5:
          message.softwareVersionString = reader.string()
          break
        case 6:
          message.cDVersionNumber = reader.uint32()
          break
        case 7:
          message.revocationDate = reader.string()
          break
        case 8:
          message.certificationType = reader.string()
          break
        case 9:
          message.reason = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgRevokeModel {
    const message = { ...baseMsgRevokeModel } as MsgRevokeModel
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = String(object.signer)
    } else {
      message.signer = ''
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
    if (object.revocationDate !== undefined && object.revocationDate !== null) {
      message.revocationDate = String(object.revocationDate)
    } else {
      message.revocationDate = ''
    }
    if (object.certificationType !== undefined && object.certificationType !== null) {
      message.certificationType = String(object.certificationType)
    } else {
      message.certificationType = ''
    }
    if (object.reason !== undefined && object.reason !== null) {
      message.reason = String(object.reason)
    } else {
      message.reason = ''
    }
    return message
  },

  toJSON(message: MsgRevokeModel): unknown {
    const obj: any = {}
    message.signer !== undefined && (obj.signer = message.signer)
    message.vid !== undefined && (obj.vid = message.vid)
    message.pid !== undefined && (obj.pid = message.pid)
    message.softwareVersion !== undefined && (obj.softwareVersion = message.softwareVersion)
    message.softwareVersionString !== undefined && (obj.softwareVersionString = message.softwareVersionString)
    message.cDVersionNumber !== undefined && (obj.cDVersionNumber = message.cDVersionNumber)
    message.revocationDate !== undefined && (obj.revocationDate = message.revocationDate)
    message.certificationType !== undefined && (obj.certificationType = message.certificationType)
    message.reason !== undefined && (obj.reason = message.reason)
    return obj
  },

  fromPartial(object: DeepPartial<MsgRevokeModel>): MsgRevokeModel {
    const message = { ...baseMsgRevokeModel } as MsgRevokeModel
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer
    } else {
      message.signer = ''
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
    if (object.revocationDate !== undefined && object.revocationDate !== null) {
      message.revocationDate = object.revocationDate
    } else {
      message.revocationDate = ''
    }
    if (object.certificationType !== undefined && object.certificationType !== null) {
      message.certificationType = object.certificationType
    } else {
      message.certificationType = ''
    }
    if (object.reason !== undefined && object.reason !== null) {
      message.reason = object.reason
    } else {
      message.reason = ''
    }
    return message
  }
}

const baseMsgRevokeModelResponse: object = {}

export const MsgRevokeModelResponse = {
  encode(_: MsgRevokeModelResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRevokeModelResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRevokeModelResponse } as MsgRevokeModelResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgRevokeModelResponse {
    const message = { ...baseMsgRevokeModelResponse } as MsgRevokeModelResponse
    return message
  },

  toJSON(_: MsgRevokeModelResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgRevokeModelResponse>): MsgRevokeModelResponse {
    const message = { ...baseMsgRevokeModelResponse } as MsgRevokeModelResponse
    return message
  }
}

const baseMsgProvisionModel: object = {
  signer: '',
  vid: 0,
  pid: 0,
  softwareVersion: 0,
  softwareVersionString: '',
  cDVersionNumber: 0,
  provisionalDate: '',
  certificationType: '',
  reason: ''
}

export const MsgProvisionModel = {
  encode(message: MsgProvisionModel, writer: Writer = Writer.create()): Writer {
    if (message.signer !== '') {
      writer.uint32(10).string(message.signer)
    }
    if (message.vid !== 0) {
      writer.uint32(16).int32(message.vid)
    }
    if (message.pid !== 0) {
      writer.uint32(24).int32(message.pid)
    }
    if (message.softwareVersion !== 0) {
      writer.uint32(32).uint32(message.softwareVersion)
    }
    if (message.softwareVersionString !== '') {
      writer.uint32(42).string(message.softwareVersionString)
    }
    if (message.cDVersionNumber !== 0) {
      writer.uint32(48).uint32(message.cDVersionNumber)
    }
    if (message.provisionalDate !== '') {
      writer.uint32(58).string(message.provisionalDate)
    }
    if (message.certificationType !== '') {
      writer.uint32(66).string(message.certificationType)
    }
    if (message.reason !== '') {
      writer.uint32(74).string(message.reason)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgProvisionModel {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgProvisionModel } as MsgProvisionModel
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string()
          break
        case 2:
          message.vid = reader.int32()
          break
        case 3:
          message.pid = reader.int32()
          break
        case 4:
          message.softwareVersion = reader.uint32()
          break
        case 5:
          message.softwareVersionString = reader.string()
          break
        case 6:
          message.cDVersionNumber = reader.uint32()
          break
        case 7:
          message.provisionalDate = reader.string()
          break
        case 8:
          message.certificationType = reader.string()
          break
        case 9:
          message.reason = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgProvisionModel {
    const message = { ...baseMsgProvisionModel } as MsgProvisionModel
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = String(object.signer)
    } else {
      message.signer = ''
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
    if (object.provisionalDate !== undefined && object.provisionalDate !== null) {
      message.provisionalDate = String(object.provisionalDate)
    } else {
      message.provisionalDate = ''
    }
    if (object.certificationType !== undefined && object.certificationType !== null) {
      message.certificationType = String(object.certificationType)
    } else {
      message.certificationType = ''
    }
    if (object.reason !== undefined && object.reason !== null) {
      message.reason = String(object.reason)
    } else {
      message.reason = ''
    }
    return message
  },

  toJSON(message: MsgProvisionModel): unknown {
    const obj: any = {}
    message.signer !== undefined && (obj.signer = message.signer)
    message.vid !== undefined && (obj.vid = message.vid)
    message.pid !== undefined && (obj.pid = message.pid)
    message.softwareVersion !== undefined && (obj.softwareVersion = message.softwareVersion)
    message.softwareVersionString !== undefined && (obj.softwareVersionString = message.softwareVersionString)
    message.cDVersionNumber !== undefined && (obj.cDVersionNumber = message.cDVersionNumber)
    message.provisionalDate !== undefined && (obj.provisionalDate = message.provisionalDate)
    message.certificationType !== undefined && (obj.certificationType = message.certificationType)
    message.reason !== undefined && (obj.reason = message.reason)
    return obj
  },

  fromPartial(object: DeepPartial<MsgProvisionModel>): MsgProvisionModel {
    const message = { ...baseMsgProvisionModel } as MsgProvisionModel
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer
    } else {
      message.signer = ''
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
    if (object.provisionalDate !== undefined && object.provisionalDate !== null) {
      message.provisionalDate = object.provisionalDate
    } else {
      message.provisionalDate = ''
    }
    if (object.certificationType !== undefined && object.certificationType !== null) {
      message.certificationType = object.certificationType
    } else {
      message.certificationType = ''
    }
    if (object.reason !== undefined && object.reason !== null) {
      message.reason = object.reason
    } else {
      message.reason = ''
    }
    return message
  }
}

const baseMsgProvisionModelResponse: object = {}

export const MsgProvisionModelResponse = {
  encode(_: MsgProvisionModelResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgProvisionModelResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgProvisionModelResponse } as MsgProvisionModelResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgProvisionModelResponse {
    const message = { ...baseMsgProvisionModelResponse } as MsgProvisionModelResponse
    return message
  },

  toJSON(_: MsgProvisionModelResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgProvisionModelResponse>): MsgProvisionModelResponse {
    const message = { ...baseMsgProvisionModelResponse } as MsgProvisionModelResponse
    return message
  }
}

/** Msg defines the Msg service. */
export interface Msg {
  CertifyModel(request: MsgCertifyModel): Promise<MsgCertifyModelResponse>
  RevokeModel(request: MsgRevokeModel): Promise<MsgRevokeModelResponse>
  /** this line is used by starport scaffolding # proto/tx/rpc */
  ProvisionModel(request: MsgProvisionModel): Promise<MsgProvisionModelResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  CertifyModel(request: MsgCertifyModel): Promise<MsgCertifyModelResponse> {
    const data = MsgCertifyModel.encode(request).finish()
    const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.compliance.Msg', 'CertifyModel', data)
    return promise.then((data) => MsgCertifyModelResponse.decode(new Reader(data)))
  }

  RevokeModel(request: MsgRevokeModel): Promise<MsgRevokeModelResponse> {
    const data = MsgRevokeModel.encode(request).finish()
    const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.compliance.Msg', 'RevokeModel', data)
    return promise.then((data) => MsgRevokeModelResponse.decode(new Reader(data)))
  }

  ProvisionModel(request: MsgProvisionModel): Promise<MsgProvisionModelResponse> {
    const data = MsgProvisionModel.encode(request).finish()
    const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.compliance.Msg', 'ProvisionModel', data)
    return promise.then((data) => MsgProvisionModelResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
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
