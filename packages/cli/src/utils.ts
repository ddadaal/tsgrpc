import { execFile, ExecOptions } from "child_process";

export async function executeCommand(cmd: string, args: string[], options?: ExecOptions) {
  return new Promise<void>((resolve, reject) => {
    execFile(cmd, args, options, (error) => {
      if (!error) { resolve(); return; }
      reject(error as Error);
    });
  });
}


export type Logger = (msg: string, ...params: any[]) => void;
