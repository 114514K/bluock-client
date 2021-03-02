import path from "path";
import sass from "sass";
import fibers from "fibers";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = process.env.BASE_URL ?? "/";

const config: Configuration = {
  mode: isProduction ? "production" : "development",
  entry: {
    app: path.join(__dirname, "src", "index.tsx")
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".module.scss"],
    alias: { /* TODO: Add this as needed */ }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "head",
      scriptLoading: "defer",
      minify: false,
      template: path.join(__dirname, "src", "template.html")
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "public")
        }
      ]
    })
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
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                module: "ESNext"
              }
            }
          }
        ]
      },
      {
        test: /.module.scss?/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: isProduction ? "[hash:base64:16]" : "[name]__[local]",
                exportLocalsConvention: "dashesOnly"
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: sass,
              sassOptions: {
                fiber: fibers
              }
            },
          },
        ]
      }
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

