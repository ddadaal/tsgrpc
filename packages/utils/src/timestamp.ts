import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

export const timestampObjToDate = (timestamp: Timestamp.AsObject) => {
  const seconds = timestamp.seconds;
  const nanos = timestamp.nanos;

  return new Date((seconds * 1000) + (nanos / 1000000));
};
