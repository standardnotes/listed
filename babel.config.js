module.exports = function (api) {
    var validEnv = ["development", "production"];
    var currentEnv = api.env();
    var isDevelopmentEnv = api.env("development");

    if (!validEnv.includes(currentEnv)) {
        throw new Error(
            "Please specify a valid `NODE_ENV` or " +
                '`BABEL_ENV` environment variables. Valid values are "development", ' +
                '"test", and "production". Instead, received: ' +
                JSON.stringify(currentEnv) +
                "."
        );
    }

    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    forceAllTransforms: true,
                    useBuiltIns: "entry",
                    corejs: 3,
                    modules: false,
                    exclude: ["transform-typeof-symbol"],
                },
            ],
            [
                "@babel/preset-react",
                {
                    development: isDevelopmentEnv,
                    useBuiltIns: true,
                },
            ],
        ],
        plugins: ["@babel/plugin-transform-runtime"],
    };
};
