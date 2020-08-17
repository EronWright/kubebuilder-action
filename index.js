const core = require('@actions/core');
const github = require('@actions/github');
const os = require('os');
const path = require('path');

try {
  const version = core.getInput('version');
  const osPlat = os.platform();
  const osArch = os.arch();

  core.info(`Going to install kubebuilder ${version} for ${osPlat}-${osArch}`)

  const downloadUrl = `https://go.kubebuilder.io/dl/${version}/${osPlat}/${osArch}`
  const downloadPath = await tc.downloadTool(downloadPath, undefined, undefined);
  
  var extPath = ""
  if (arch === 'win32') {
    extPath = await tc.extractZip(downloadPath);
  } else {
    extPath = await tc.extractTar(downloadPath);
  }

  const cachedDir = await tc.cacheDir(
    extPath,
    'kubebuilder',
    version
  );
  core.info(`Successfully cached kubebuilder to ${cachedDir}`);

  const bp = path.join(cachedDir, 'bin');
  core.addPath(bp);
  
} catch (error) {
  core.setFailed(error.message);
}