const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "lineage-graph.js",
    library: {
      name: "lineage-graph",
      type: "umd",
    },
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      src: path.join(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
