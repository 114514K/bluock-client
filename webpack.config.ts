import path from "path";
import { Configuration } from "webpack";

const isDevelopment = process.env.NODE_ENV === "production";
const baseURL = process.env.BASE_URL ?? "/";

const config: Configuration = {
  mode: isDevelopment ? "development" : "production",
  entry: {
    app: path.join(__dirname, "src", "index.tsx")
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".module.scss"],
    alias: { /* TODO: Add this as needed */ }
  },
  plugins: [
    // TODO: Add plugin to inject script in the HTML file, and copy matters into the output directory
  ],
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          },
          { loader: "ts-loader" }
        ]
      },
      // TODO: Add loaders to load moduled SASS
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: baseURL,
    filename: "scripts/[contenthash:16].js",
    chunkFilename: "scripts/[contenthash:16].js"
  }
};

export default config;

