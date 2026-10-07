const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.watcher.watchman = false;
config.watcher.healthCheck.enabled = false;

module.exports = config;
