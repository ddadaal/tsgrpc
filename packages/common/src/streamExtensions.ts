import type { ObjectReadable, ObjectWritable } from "@grpc/grpc-js/build/src/object-stream";
import { once } from "events";
import { createAsyncIterable } from "src/readableToAsyncIterable";

export interface WriterExtensions<T> {
  /**
   * Write data into the stream with backpressure handling
   */
  writeAsync: (data: T) => Promise<void>;
};

export const createWriterExtensions = <T>(stream: ObjectWritable<T>): WriterExtensions<T> => {
  return {
    writeAsync: async (data) => {
      if (!stream.write(data)) {
        await once(stream, "drain");
      } else {
        await new Promise((res) => process.nextTick(res));
      }
    },
  };
};

export interface ReaderExtensions<T> {
  /**
   * Read one object from stream.
   * @returns one object or undefined for no data is read
   */
  readAsync: () => Promise<T | undefined>;

  /**
   * Create a AsyncIterable
   */
  iter: () => AsyncIterable<T>;
};

export const createReaderExtensions = <T>(stream: ObjectReadable<T>): ReaderExtensions<T> => {

  const iter = () => createAsyncIterable(stream);

  return {
    iter,
    readAsync: async () => {
      for await (const r of iter()) {
        return r;
      }
      return undefined;
    },
  };
};
