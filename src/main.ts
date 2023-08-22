import * as core from "@actions/core";
import * as stepca from "./setup-step-ca";

export async function run(): Promise<void> {
  try {
    const version: string = core.getInput("version");

    validateInput(version);

    await stepca.installStepCA(version);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

function validateInput(version: string): void {
  const versionValidation = /^\d+\.\d+\.\d+|latest$/;

  if (!versionValidation.test(version)) {
    throw new Error(
      `The supplied input ${version} is not a valid version. Please supply a semver format like major.minor.hotfix`
    );
  }
}

run();
