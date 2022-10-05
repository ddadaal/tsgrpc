# Example project

Run the commands in the root of the project, not `example` folder.

```bash
# Install dependencies
pnpm i

# Build the libraries
pnpm build

# Enter example project
cd example

# Reinstall to generate library binaries after the build is complete
pnpm i

# Generate ts files from protobuf files
pnpm protos
# ..or
npx tsgrpc-cli protos

# Start dev server
# A gRPC server will be listening at 5000.
pnpm dev

# Regenerate files when proto files are changed
pnpm protos
```
