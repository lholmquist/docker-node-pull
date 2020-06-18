'use strict';

const minikubeEnv = require('/home/lucasholmquist/develop/cool-shell-shit/');
const Docker = require('dockerode');
const { readFileSync } = require('fs');


minikubeEnv().then((envs) => {
  const envsRedueced = envs.reduce((acc, x) => {
    return { ...acc, ...x };
  }, {});

  console.log(envsRedueced);

  const url = new URL(envsRedueced['DOCKER_HOST']);

  const docker = new Docker({
    host: url.hostname,
    port: url.port || 2375,
    ca: readFileSync(`${envsRedueced['DOCKER_CERT_PATH']}/ca.pem`),
    cert: readFileSync(`${envsRedueced['DOCKER_CERT_PATH']}/cert.pem`),
    key: readFileSync(`${envsRedueced['DOCKER_CERT_PATH']}/key.pem`)
  });

  docker.listImages({all: true}, function(err, containers) {
    console.log('ALL: ' + containers.length);
  });

});

// docker.pull('registry.access.redhat.com/ubi8/nodejs-12', (err, stream) => {
//   stream.pipe(process.stdout);
// });

// export DOCKER_TLS_VERIFY="1"
// export DOCKER_HOST="tcp://192.168.39.50:2376"
// export DOCKER_CERT_PATH="/home/lucasholmquist/.minikube/certs"
// export MINIKUBE_ACTIVE_DOCKERD="minikube"


// var docker5 = new Docker({
//   host: '192.168.1.10',
//   port: process.env.DOCKER_PORT || 2375,
//   ca: fs.readFileSync('ca.pem'),
//   cert: fs.readFileSync('cert.pem'),
//   key: fs.readFileSync('key.pem'),
//   version: 'v1.25' // required when Docker >= v1.13, https://docs.docker.com/engine/api/version-history/
// });
