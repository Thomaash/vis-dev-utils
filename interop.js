#!/usr/bin/env node

// Ideally this would be just a Shell script but Windows exists and I don't want
// to force Windows users to install Shell and configure it to be used to run
// npm scripts (and break their Windows only projects?).

const { spawnSync } = require("child_process");

const { status } = spawnSync(
  "node",
  [
    "./bin/test-e2e-interop.js",
    // This is the shared stuff used in all of our projects.
    "--config",
    "./public/interop/base-config.json",
    // This is specific to this project.
    "--project",
    "vis-charts https://github.com/visjs/vis-charts.git",
    "--project",
    "vis-data https://github.com/visjs/vis-data.git",
    "--project",
    "vis-dev-utils ./vis-dev-utils-0.0.0-no-version.tgz",
    "--project",
    "vis-graph3d https://github.com/visjs/vis-graph3d.git",
    "--project",
    "vis-network https://github.com/visjs/vis-network.git",
    "--project",
    "vis-timeline https://github.com/visjs/vis-timeline.git",
    "--project",
    "vis-util https://github.com/visjs/vis-util.git",
    // Any additional options passed from the command line (e.g. a fail command
    // for debugging).
    ...process.argv.slice(2),
  ],
  { stdio: "inherit" }
);
process.exitCode = status;
