jest.mock("@actions/core");
jest.mock("@actions/exec");
jest.mock("@actions/io");
jest.mock("@actions/tool-cache");
jest.mock("node:process");
jest.mock("@octokit/request");
import * as stepca from "../src/setup-step-ca";
import { expect, jest, test } from "@jest/globals";

const core = require("@actions/core");
const exec = require("@actions/exec");
const tc = require("@actions/tool-cache");
const process = require("process");
const io = require("@actions/io");
const request = require("@octokit/request");

test("run should succeed with latest version", async () => {
  // Specific variables for this test and mock Actions input
  const version = "latest";

  // Mock octokit response for latest release
  request.request = jest.fn().mockImplementationOnce(() => ({
    data: {
      tag_name: "v9999.99.99",
    },
  }));

  // Mock os and platform specific to this test
  Object.defineProperty(process, "platform", {
    value: "linux",
  });
  Object.defineProperty(process, "arch", {
    value: "x64",
  });

  // Mock tools-cache funtions return values
  tc.downloadTool = jest.fn().mockReturnValueOnce("step-ca.tar.gz");
  tc.extractTar = jest.fn().mockReturnValueOnce("step-ca");
  tc.cacheDir = jest.fn().mockReturnValueOnce("step-ca");

  // Run function and validate steps
  await stepca.installStepCA(version);
  expect(io.mkdirP).toHaveBeenCalledWith("step-ca");
  expect(tc.downloadTool).toHaveBeenCalledWith(
    "https://github.com/smallstep/certificates/releases/download/v9999.99.99/step-ca_linux_9999.99.99_amd64.tar.gz"
  );
  expect(tc.extractTar).toHaveBeenCalledWith("step-ca.tar.gz", "step-ca", [
    "xz",
    "--strip-components=1",
  ]);
  expect(tc.cacheDir).toHaveBeenCalledWith("step-ca", "step-ca", "9999.99.99");
  expect(core.addPath).toHaveBeenCalledWith("step-ca");
  expect(exec.exec).toHaveBeenCalledWith("step-ca", ["version"]);
});

test("run should succeed on linux x64", async () => {
  // Specific variables for this test and mock Actions input
  const version = "0.0.0";

  // Mock os and platform specific to this test
  Object.defineProperty(process, "platform", {
    value: "linux",
  });
  Object.defineProperty(process, "arch", {
    value: "x64",
  });

  // Mock tools-cache funtions return values
  tc.downloadTool = jest.fn().mockReturnValueOnce("step-ca.tar.gz");
  tc.extractTar = jest.fn().mockReturnValueOnce("step-ca");
  tc.cacheDir = jest.fn().mockReturnValueOnce("step-ca");

  // Run function and validate steps
  await stepca.installStepCA(version);
  expect(io.mkdirP).toHaveBeenCalledWith("step-ca");
  expect(tc.downloadTool).toHaveBeenCalledWith(
    "https://github.com/smallstep/certificates/releases/download/v0.0.0/step-ca_linux_0.0.0_amd64.tar.gz"
  );
  expect(tc.extractTar).toHaveBeenCalledWith("step-ca.tar.gz", "step-ca", [
    "xz",
    "--strip-components=1",
  ]);
  expect(tc.cacheDir).toHaveBeenCalledWith("step-ca", "step-ca", version);
  expect(core.addPath).toHaveBeenCalledWith("step-ca");
  expect(exec.exec).toHaveBeenCalledWith("step-ca", ["version"]);
});

test("run should succeed on linux arm64", async () => {
  // Specific variables for this test and mock Actions input
  const version = "0.0.0";

  // Mock os and platform specific to this test
  Object.defineProperty(process, "platform", {
    value: "linux",
  });
  Object.defineProperty(process, "arch", {
    value: "arm64",
  });

  // Mock tools-cache funtions return values
  tc.downloadTool = jest.fn().mockReturnValueOnce("step-ca.tar.gz");
  tc.extractTar = jest.fn().mockReturnValueOnce("step-ca");
  tc.cacheDir = jest.fn().mockReturnValueOnce("step-ca");

  // Run function and validate steps
  await stepca.installStepCA(version);
  expect(io.mkdirP).toHaveBeenCalledWith("step-ca");
  expect(tc.downloadTool).toHaveBeenCalledWith(
    "https://github.com/smallstep/certificates/releases/download/v0.0.0/step-ca_linux_0.0.0_arm64.tar.gz"
  );
  expect(tc.extractTar).toHaveBeenCalledWith("step-ca.tar.gz", "step-ca", [
    "xz",
    "--strip-components=1",
  ]);
  expect(tc.cacheDir).toHaveBeenCalledWith("step-ca", "step-ca", version);
  expect(core.addPath).toHaveBeenCalledWith("step-ca");
  expect(exec.exec).toHaveBeenCalledWith("step-ca", ["version"]);
});

test("run should succeed on darwin x64", async () => {
  // Specific variables for this test and mock Actions input
  const version = "0.0.0";

  // Mock os and platform specific to this test
  Object.defineProperty(process, "platform", {
    value: "darwin",
  });
  Object.defineProperty(process, "arch", {
    value: "x64",
  });

  // Mock tools-cache funtions return values
  tc.downloadTool = jest.fn().mockReturnValueOnce("step-ca.tar.gz");
  tc.extractTar = jest.fn().mockReturnValueOnce("step-ca");
  tc.cacheDir = jest.fn().mockReturnValueOnce("step-ca");

  // Run function and validate steps
  await stepca.installStepCA(version);
  expect(io.mkdirP).toHaveBeenCalledWith("step-ca");
  expect(tc.downloadTool).toHaveBeenCalledWith(
    "https://github.com/smallstep/certificates/releases/download/v0.0.0/step-ca_darwin_0.0.0_amd64.tar.gz"
  );
  expect(tc.extractTar).toHaveBeenCalledWith("step-ca.tar.gz", "step-ca", [
    "xz",
    "--strip-components=1",
  ]);
  expect(tc.cacheDir).toHaveBeenCalledWith("step-ca", "step-ca", version);
  expect(core.addPath).toHaveBeenCalledWith("step-ca");
  expect(exec.exec).toHaveBeenCalledWith("step-ca", ["version"]);
});

test("run should succeed on windows x64", async () => {
  // Specific variables for this test and mock Actions input
  const version = "0.0.0";

  // Mock os and platform specific to this test
  Object.defineProperty(process, "platform", {
    value: "win32",
  });
  Object.defineProperty(process, "arch", {
    value: "x64",
  });

  // Mock tools-cache funtions return values
  tc.downloadTool = jest.fn().mockReturnValueOnce("step-ca.tar.gz");
  tc.extractTar = jest.fn().mockReturnValueOnce("step-ca");
  tc.cacheDir = jest.fn().mockReturnValueOnce("step-ca");

  // Run function and validate steps
  await stepca.installStepCA(version);
  expect(io.mkdirP).toHaveBeenCalledWith("step-ca");
  expect(tc.downloadTool).toHaveBeenCalledWith(
    "https://github.com/smallstep/certificates/releases/download/v0.0.0/step-ca_windows_0.0.0_amd64.zip"
  );
  expect(tc.extractTar).toHaveBeenCalledWith("step-ca.tar.gz", "step-ca", [
    "xz",
    "--strip-components=1",
  ]);
  expect(tc.cacheDir).toHaveBeenCalledWith("step-ca", "step-ca", version);
  expect(core.addPath).toHaveBeenCalledWith("step-ca");
  expect(exec.exec).toHaveBeenCalledWith("step-ca", ["version"]);
});

test("run should fail on unsupported platform", async () => {
  // Specific variables for this test and mock Actions input
  const version = "0.0.0";

  // Mock os and platform specific to this test
  Object.defineProperty(process, "platform", {
    value: "fakePlatform",
  });
  Object.defineProperty(process, "arch", {
    value: "x64",
  });

  // Run function and validate steps
  await expect(stepca.installStepCA(version)).rejects.toEqual(
    Error("The platform fakePlatform is not supported by this action")
  );
  expect(io.mkdirP).toHaveBeenCalledTimes(0);
  expect(tc.downloadTool).toHaveBeenCalledTimes(0);
  expect(tc.extractTar).toHaveBeenCalledTimes(0);
  expect(tc.cacheDir).toHaveBeenCalledTimes(0);
  expect(core.addPath).toHaveBeenCalledTimes(0);
  expect(exec.exec).toHaveBeenCalledTimes(0);
});

test("run should fail on unsupported architecture", async () => {
  // Specific variables for this test and mock Actions input
  const version = "0.0.0";

  // Mock os and platform specific to this test
  Object.defineProperty(process, "platform", {
    value: "linux",
  });
  Object.defineProperty(process, "arch", {
    value: "fakeArch",
  });

  // Run function and validate steps
  await expect(stepca.installStepCA(version)).rejects.toEqual(
    Error("The architecture fakeArch is not supported by this action")
  );
  expect(io.mkdirP).toHaveBeenCalledTimes(0);
  expect(tc.downloadTool).toHaveBeenCalledTimes(0);
  expect(tc.extractTar).toHaveBeenCalledTimes(0);
  expect(tc.cacheDir).toHaveBeenCalledTimes(0);
  expect(core.addPath).toHaveBeenCalledTimes(0);
  expect(exec.exec).toHaveBeenCalledTimes(0);
});
