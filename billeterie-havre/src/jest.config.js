module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/", "\\.(png|jpg|jpeg|gif|svg)$"],
  moduleNameMapper: {
    "\\.(png|jpg|ico|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "../mocks/fileMock.js",
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "json",
    "png",
    "jpg",
    "node",
  ],
};
