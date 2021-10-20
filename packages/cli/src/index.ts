#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { generateProtos } from "src/generateProtos";

yargs(hideBin(process.argv))
  .command("protos", "Generate protos files", (yargs) => {
    return yargs.options({
      configPath: { type: "string", default: "tsgrpc.json" },
    });
  }, (argv) => {
    generateProtos(argv);
  })
  .scriptName("tsgrpc")
  .demandCommand()
  .help()
  .argv;

