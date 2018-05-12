module.exports = {
	globals: {
		"ts-jest": {
			tsConfigFile: "tsconfig.json"
		}
	},
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	testRegex: "(/test/.*\\.spec\\.ts)",
	testEnvironment: "node",
	moduleFileExtensions: [
		"ts",
		"tsx",
		"js",
		"jsx",
		"json",
		"node"
	]
}
