# Example project

Run the commands in the root of the project, not `example` folder.

```bash
# Install dependencies
pnpm i

# Start dev server
# A gRPC server will be listening at 5000.
pnpm dev

# Regenerate files when protobuf files are changed
pnpm protos

# Or
npx tsgrpc-cli protos
```
