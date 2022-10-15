import fs from "fs";
import { join } from "path";
import { executeCommand, Logger } from "src/utils";

const GIT_REPO_TARGET_BASE = ".tsgrpc-cli";

const OnlyLetterAndNumberRegEx = /[^a-zA-Z0-9]/g;

/**
 * git clone a repo
 * @param repo repo url
 * @param log logger
 * @param branch git branch
 * @returns the path where the repo is cloned to
 */
export const clone = async (repo: string, log: Logger, branch?: string) => {

  await fs.promises.mkdir(GIT_REPO_TARGET_BASE, { recursive: true });

  const fullRef = repo + (branch ? ":" + branch : "");

  const target = join(GIT_REPO_TARGET_BASE, fullRef.replaceAll(OnlyLetterAndNumberRegEx, ""));

  if (fs.existsSync(target)) {
    log("%s exists. Pull for latest updates", target);
    await executeCommand("git", ["pull"], { cwd: target });
  } else {
    log("Cloning %s to %s", fullRef, target);
    await executeCommand("git", [
      "clone", "--depth", "1",
      ...branch ? ["-b", branch] : [],
      repo,
      target,
    ]);
  }


  return target;
};
