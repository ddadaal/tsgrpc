#!/usr/bin/env node
import { generateProtos } from "src/generateProtos";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

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

