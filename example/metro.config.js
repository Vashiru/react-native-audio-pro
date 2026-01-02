const path = require('path');

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const root = path.resolve(__dirname, '..');

const pak = require('../package.json');

/**
 * Metro configuration for monorepo setup
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
	watchFolders: [root],

	resolver: {
		// Map peer dependencies to the example app's node_modules to avoid duplicates
		extraNodeModules: {
			'react': path.join(__dirname, 'node_modules', 'react'),
			'react-native': path.join(__dirname, 'node_modules', 'react-native'),
			// Map the library package to its source directory
			[pak.name]: path.join(root, 'src'),
		},

		// Block the root node_modules for these packages to prevent duplicates
		blockList: [
			new RegExp(
				`^${path.join(root, 'node_modules', 'react-native').replace(/[/\\]/g, '[/\\\\]')}\\/.*$`,
			),
			new RegExp(
				`^${path.join(root, 'node_modules', 'react').replace(/[/\\]/g, '[/\\\\]')}\\/.*$`,
			),
		],
	},
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
