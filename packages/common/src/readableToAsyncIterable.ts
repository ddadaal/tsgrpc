// https://raw.githubusercontent.com/deeplay-io/nice-grpc/master/packages/nice-grpc/src/utils/readableToAsyncIterable.ts

import { ObjectReadable } from "@grpc/grpc-js/build/src/object-stream";

/**
 * This is a copy of NodeJS createAsyncIterator(stream),
 * but add support for await loop multiple times on a stream
 *
 * https://github.com/nodejs/node/blob/v15.8.0/lib/internal/streams/readable.js#L1079
 *
 * @internal
 */
export async function* createAsyncIterable<T>(
  stream: ObjectReadable<T>,
): AsyncIterable<T> {
  let callback = nop;

  function next(this: any, resolve?: any) {
    if (this === stream) {
      callback();
      callback = nop;
    } else {
      callback = resolve;
    }
  }

  const state = (stream as any)._readableState;

  function onError(this: any, err) {
    error = err;
    errorEmitted = true;
    next.call(this);
  }

  function onEnd(this: any) {
    endEmitted = true;
    next.call(this);
  }

  function onClose(this: any) {
    closeEmitted = true;
    next.call(this);
  }

  let error = state.errored;
  let errorEmitted = state.errorEmitted;
  let endEmitted = state.endEmitted;
  let closeEmitted = state.closeEmitted;

  // Create cleanup function to ensure listeners are always removed
  const cleanup = () => {
    stream
      .removeListener("readable", next)
      .removeListener("error", onError)
      .removeListener("end", onEnd)
      .removeListener("close", onClose);
  };

  stream
    .on("readable", next)
    .on("error", onError)
    .on("end", onEnd)
    .on("close", onClose);

  try {
    while (true) {
      const chunk = stream.destroyed ? null : stream.read();
      if (chunk !== null) {
        yield chunk;
      } else if (errorEmitted) {
        throw error;
      } else if (endEmitted) {
        break;
      } else if (closeEmitted) {
        break;
      } else {
        await new Promise(next);
      }
    }
  } finally {
    // Ensure cleanup is called even if iteration is aborted
    cleanup();
  }

}

const nop = () => {};
