import { Metadata, MetadataValue, status, StatusObject } from "@grpc/grpc-js";

export class ServiceError extends Error implements StatusObject {

  code: status;
  details: string;
  metadata: Metadata;

  constructor(
    status: {
      code: status;
      message?: string;
      details?: string;
      metadata?: Record<string, MetadataValue | MetadataValue[]>;
    },
    options?: ErrorOptions,
  ) {
    super(status.message, options);

    this.code = status.code;
    this.details = status.details ?? "";

    this.metadata = new Metadata();

    if (status.metadata) {
      Object.entries(status.metadata).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => this.metadata.set(key, val));
        } else {
          this.metadata.set(key, value);
        }
      });
    }
  }
}
