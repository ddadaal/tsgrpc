import { exec, ExecOptions } from "child_process";
import { quote } from "shell-quote";

export async function executeCommand(cmd: string, args: string[], options?: ExecOptions) {
  return new Promise<void>((resolve, reject) => {
    exec(quote([cmd, ...args]), { ...options }, (error) => {
      if (!error) { resolve(); }
      reject(error);
    });
  });
}


export type Logger = (msg: string, ...params: any[]) => void;
