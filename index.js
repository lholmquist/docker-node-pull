'use strict';

const Docker = require('dockerode');
const docker = new Docker();

docker.pull('registry.access.redhat.com/ubi8/nodejs-10', (err, stream) => {
  stream.pipe(process.stdout);
});
