module.exports = {
    setupFiles: ["<rootDir>/enzyme.config.js"],
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy",
        "\\.(png)$": "<rootDir>/__mocks__/fileMock.js"
    },
    testPathIgnorePatterns: ["<rootDir>/__tests__/hocs/testableComponent.js"],
    clearMocks: true,
    collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
    coverageDirectory: "coverage"
};
