import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as io from "@actions/io";
import * as tc from "@actions/tool-cache";
import { request } from "@octokit/request";

export async function installStepCA(version: string): Promise<string> {
  let artifactVersion;
  let artifactPlatform;
  let artifactArch;
  let compressFormat;

  if (version === "latest") {
    const response = await request(
      "GET /repos/{owner}/{repo}/releases/latest",
      {
        owner: "smallstep",
        repo: "certificates",
      }
    );
    artifactVersion = response.data.tag_name.replace("v", "");
  } else {
    artifactVersion = version;
  }

  if (process.platform === "darwin") {
    artifactPlatform = "darwin";
    compressFormat = "tar.gz";
  } else if (process.platform === "linux") {
    artifactPlatform = "linux";
    compressFormat = "tar.gz";
  } else if (process.platform === "win32") {
    artifactPlatform = "windows";
    compressFormat = "zip";
  } else {
    throw new Error(
      `The platform ${process.platform} is not supported by this action`
    );
  }

  if (process.arch === "arm64") {
    artifactArch = "arm64";
  } else if (process.arch === "x64") {
    artifactArch = "amd64";
  } else {
    throw new Error(
      `The architecture ${process.arch} is not supported by this action`
    );
  }

  await io.mkdirP("step-ca");

  const stepCAUrl = `https://github.com/smallstep/certificates/releases/download/v${artifactVersion}/step-ca_${artifactPlatform}_${artifactVersion}_${artifactArch}.${compressFormat}`;
  const stepCADownload = await tc.downloadTool(stepCAUrl);
  core.info(`Downloaded step-ca from ${stepCAUrl} to ${stepCADownload}`);
  const stepCAExtracted = await tc.extractTar(stepCADownload, "step-ca", [
    "xz",
    "--strip-components=1",
  ]);
  core.info(
    `Extracted step-ca_${artifactPlatform}_${artifactVersion}_${artifactArch}.tar.gz to ${stepCAExtracted}`
  );
  const stepCACachedPath = await tc.cacheDir(
    stepCAExtracted,
    "step-ca",
    artifactVersion
  );
  core.addPath(`${stepCACachedPath}/bin`);
  core.info(
    `Added ${stepCACachedPath} to tool-cache and ${stepCACachedPath}/bin to $PATH`
  );

  const allStepCAVersions = tc.findAllVersions("step-ca");
  core.info(`Versions of step available: ${allStepCAVersions}`);

  await exec.exec("step-ca", ["version"]);

  return stepCAExtracted;
}
