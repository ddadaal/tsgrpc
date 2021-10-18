#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { generateProtos } from "src/cli/generateProtos";

yargs(hideBin(process.argv))
  .command("protos", "Generate protos files", (yargs) => {
    return yargs.options({
      configPath: { type: "string", default: "tsgrpc.json" },
      targetDir: { type: "string", default: "src/generated" },
    });
  }, (argv) => {
    generateProtos(argv);
  })
  .scriptName("tsgrpc")
  .demandCommand()
  .help()
  .argv;

