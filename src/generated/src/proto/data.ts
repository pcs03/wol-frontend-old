/* eslint-disable */
import _m0 from 'protobufjs/minimal';

export const protobufPackage = 'wol';

export interface void {
}

export interface Device {
id: number,
name: string,
macAddress: string,
status: string,
}

export interface Devices {
devices: Device[],
}

function createBasevoid(): void {
      return {  };
    }

export const void = {
              encode(
      _: void,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): void {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBasevoid();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(_: any): void {
      return {
};
},

toJSON(_: void): unknown {
      const obj: any = {};
return obj;
},

create<I extends Exact<DeepPartial<void>, I>>(base?: I): void {
return void.fromPartial(base ?? {})
},

fromPartial<I extends Exact<DeepPartial<void>, I>>(_: I): void {
const message = createBasevoid();
return message;
}
            };

function createBaseDevice(): Device {
      return { id: 0,name: "",macAddress: "",status: "" };
    }

export const Device = {
              encode(
      message: Device,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if ( message.id !== 0) {
          writer.uint32(8).int32(message.id);
        }
if ( message.name !== "") {
          writer.uint32(18).string(message.name);
        }
if ( message.macAddress !== "") {
          writer.uint32(26).string(message.macAddress);
        }
if ( message.status !== "") {
          writer.uint32(34).string(message.status);
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): Device {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseDevice();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 8) {
        break;
      }
    
        message.id = reader.int32();
continue;
case 2:
if (tag !== 18) {
        break;
      }
    
        message.name = reader.string();
continue;
case 3:
if (tag !== 26) {
        break;
      }
    
        message.macAddress = reader.string();
continue;
case 4:
if (tag !== 34) {
        break;
      }
    
        message.status = reader.string();
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): Device {
      return {
id: isSet(object.id)
          ? Number(object.id)
          : 0,
name: isSet(object.name)
          ? String(object.name)
          : "",
macAddress: isSet(object.macAddress)
          ? String(object.macAddress)
          : "",
status: isSet(object.status)
          ? String(object.status)
          : "",
};
},

toJSON(message: Device): unknown {
      const obj: any = {};
message.id !== undefined && (obj.id = Math.round(message.id));
message.name !== undefined && (obj.name = message.name);
message.macAddress !== undefined && (obj.macAddress = message.macAddress);
message.status !== undefined && (obj.status = message.status);
return obj;
},

create<I extends Exact<DeepPartial<Device>, I>>(base?: I): Device {
return Device.fromPartial(base ?? {})
},

fromPartial<I extends Exact<DeepPartial<Device>, I>>(object: I): Device {
const message = createBaseDevice();
message.id = object.id ?? 0;
message.name = object.name ?? "";
message.macAddress = object.macAddress ?? "";
message.status = object.status ?? "";
return message;
}
            };

function createBaseDevices(): Devices {
      return { devices: [] };
    }

export const Devices = {
              encode(
      message: Devices,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
for (const v of message.devices) {
            Device.encode(v!, writer.uint32(10).fork()).ldelim();
          }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): Devices {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseDevices();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 10) {
        break;
      }
    
            
            message.devices.push(Device.decode(reader, reader.uint32()));
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): Devices {
      return {
devices: Array.isArray(object?.devices) ? object.devices.map((e: any) => Device.fromJSON(e)): [],
};
},

toJSON(message: Devices): unknown {
      const obj: any = {};
if (message.devices) {
          obj.devices = message.devices.map(e => e ? Device.toJSON(e) : undefined);
        } else {
          obj.devices = [];
        }
return obj;
},

create<I extends Exact<DeepPartial<Devices>, I>>(base?: I): Devices {
return Devices.fromPartial(base ?? {})
},

fromPartial<I extends Exact<DeepPartial<Devices>, I>>(object: I): Devices {
const message = createBaseDevices();
message.devices = object.devices?.map((e) => Device.fromPartial(e)) || [];
return message;
}
            };

export interface Todo {
createDevice(request: Device): Promise<Device>;
readDevices(request: void): Promise<Devices>;
}

export class TodoClientImpl implements Todo {private readonly rpc: Rpc;private readonly service: string;constructor(rpc: Rpc, opts?: {service?: string}) {this.service = opts?.service || "wol.Todo";this.rpc = rpc;this.createDevice = this.createDevice.bind(this);this.readDevices = this.readDevices.bind(this);}
    createDevice(
      request: Device
    ): Promise<Device> {
      const data = Device.encode(request).finish();
      const promise = this.rpc.request(
        
        this.service,
        "createDevice",
        data,
        
      );
      return promise.then(data => Device.decode(_m0.Reader.create(data)));
    }
  
    readDevices(
      request: void
    ): Promise<Devices> {
      const data = void.encode(request).finish();
      const promise = this.rpc.request(
        
        this.service,
        "readDevices",
        data,
        
      );
      return promise.then(data => Devices.decode(_m0.Reader.create(data)));
    }
  }

interface Rpc {
request(
        
        service: string,
        method: string,
        data: Uint8Array,
        
      ): Promise<Uint8Array>;
}







type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> =  T extends Builtin
        ? T
        
        : T extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : T extends {}
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
      export type Exact<P, I extends P> = P extends Builtin
        ? P
        : P &
        { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> >]: never };

























function isSet(value: any): boolean {
      return value !== null && value !== undefined;
    }





