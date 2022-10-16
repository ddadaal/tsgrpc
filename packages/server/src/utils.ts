import { ObjectReadable, ObjectWritable } from "@grpc/grpc-js/build/src/object-stream";
import { once } from "events";

export type AugmentedWriter<T> = {
  writeAsync: (data: T) => Promise<void>;
}

export const augmentedWriter = <T>(stream: ObjectWritable<T>): AugmentedWriter<T> => {
  return {
    writeAsync: async (data) => {
      if (!stream.write(data)) {
        await once(stream, "drain");
      }
    },
  };
};

export type AugmentedReader<T> = {
  readAsync: () => Promise<T>;
}

export const augmentedReader = <T>(stream: ObjectReadable<T>): AugmentedReader<T> => {
  return {
    readAsync: async () => (await once(stream, "data"))[0],
  };
};
