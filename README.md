<h1 align="center">Welcome to webpack-guide 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://shudong.wang" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/wsd312" target="_blank">
    <img alt="Twitter: wsd312" src="https://img.shields.io/twitter/follow/wsd312.svg?style=social" />
  </a>
</p>

> webpack url loader

### 🏠 [Homepage](https://shudong.wang)

### ✨ [Demo](https://shudong.wang)

### 特性

> The file-loader resolves import/require() on a file into a url and emits the file into the output directory.

文件加载器将文件上的import / require（）解析为url，并将该文件发射到输出目录中。

> 在css文件中定义background的属性或者在html中引入image的src，
我们知道在webpack打包后这些图片会打包至定义好的一个文件夹下，和开发时候的相对路径会不一样，
这就会导致导入图片路径的错误。而file-loader正是为了解决此类问题而产生的，他修改打包后图片的储存路径，
再根据配置修改我们引用的路径，使之对应引入。



## Install

```sh
yarn
```

## Author

👤 **starkwang**

* Website: https://shudong.wang
* Twitter: [@wsd312](https://twitter.com/wsd312)
* Github: [@wsdo](https://github.com/wsdo)

## Show your support

Give a ⭐️ if this project helped you!



## webpack url loader 


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



The `file-loader` resolves `import`/`require()` on a file into a url and emits the file into the output directory.

## 起步

你需要预先安装 `file-loader`：

```console
$ npm install file-loader --save-dev
```

在一个 bundle 文件中 import（或 `require`）目标文件：

**file.js**

```js
import img from './file.png';
```

然后，在 `webpack` 配置中添加 loader。例如：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
};
```

然后，通过你偏爱的方式去运行 `webpack`。将 `file.png` 作为一个文件，生成到输出目录，
（如果指定了选项，则使用指定的命名约定）
并返回文件的 public URI。

> ℹ️ 默认情况下，生成文件的文件名，是文件内容的 MD5 哈希值，并会保留所引用资源的原始扩展名。

## 选项

### `name`

类型：`String|Function`
默认：`'[hash].[ext]'`

Specifies a custom filename template for the target file(s) using the query
parameter `name`. For example, to emit a file from your `context` directory into
the output directory retaining the full directory structure, you might use:

#### `String`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
};
```

#### `Function`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                if (process.env.NODE_ENV === 'development') {
                  return '[path][name].[ext]';
                }

                return '[hash].[ext]';
              },
            },
          },
        ],
      },
    ],
  },
};
```

> ℹ️ 默认情况下，文件会按照你指定的路径和名称输出同一目录中，且会使用相同的 URI 路径来访问文件。

### `outputPath`

类型：`String|Function`
默认：`undefined`

Specify a filesystem path where the target file(s) will be placed.

#### `String`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
};
```

#### `Function`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: (url, resourcePath, context) => {
                // `resourcePath` is original absolute path to asset
                // `context` is directory where stored asset (`rootContext`) or `context` option

                // To get relative path you can use
                // const relativePath = path.relative(context, resourcePath);

                if (/my-custom-image\.png/.test(resourcePath)) {
                  return `other_output_path/${url}`;
                }

                if (/images/.test(context)) {
                  return `image_output_path/${url}`;
                }

                return `output_path/${url}`;
              },
            },
          },
        ],
      },
    ],
  },
};
```

### `publicPath`

类型：`String|Function`
默认：[`__webpack_public_path__`](https://webpack.js.org/api/module-variables/#__webpack_public_path__-webpack-specific-)

Specifies a custom public path for the target file(s).

#### `String`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: 'assets',
            },
          },
        ],
      },
    ],
  },
};
```

#### `Function`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: (url, resourcePath, context) => {
                // `resourcePath` is original absolute path to asset
                // `context` is directory where stored asset (`rootContext`) or `context` option

                // To get relative path you can use
                // const relativePath = path.relative(context, resourcePath);

                if (/my-custom-image\.png/.test(resourcePath)) {
                  return `other_public_path/${url}`;
                }

                if (/images/.test(context)) {
                  return `image_output_path/${url}`;
                }

                return `public_path/${url}`;
              },
            },
          },
        ],
      },
    ],
  },
};
```

### `context`

类型：`String`
默认：[`context`](https://webpack.js.org/configuration/entry-context/#context)

Specifies a custom file context.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: 'project',
            },
          },
        ],
      },
    ],
  },
};
```

### `emitFile`

类型：`Boolean`
默认：`true`

如果是 true，生成一个文件（向文件系统写入一个文件）。
如果是 false，loader 会返回 public URI，但**不会**生成文件。
对于服务器端 package，禁用此选项通常很有用。

**file.js**

```js
// bundle file
import img from './file.png';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
            },
          },
        ],
      },
    ],
  },
};
```

### `regExp`

类型：`RegExp`
默认：`undefined`

Specifies a Regular Expression to one or many parts of the target file path.
The capture groups can be reused in the `name` property using `[N]`
[placeholder](https://github.com/webpack-contrib/file-loader#placeholders).

**file.js**

```js
import img from './customer01/file.png';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/,
              name: '[1]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};
```

> ℹ️ If `[0]` is used, it will be replaced by the entire tested string, whereas `[1]` will contain the first capturing parenthesis of your regex and so on...

## placeholders

Full information about placeholders you can find [here](https://github.com/webpack/loader-utils#interpolatename).

### `[ext]`

类型：`String`
默认：`file.extname`

目标文件/资源的文件扩展名。

### `[name]`

类型：`String`
默认：`file.basename`

文件/资源的基本名称。

### `[path]`

类型：`String`
默认：`file.directory`

The path of the resource relative to the webpack/config `context`.

### `[folder]`

类型：`String`
默认：`file.folder`

The folder of the resource is in.

### `[emoji]`

类型：`String`
默认：`undefined`

A random emoji representation of `content`.

### `[emoji:<length>]`

类型：`String`
默认：`undefined`

Same as above, but with a customizable number of emojis

### `[hash]`

类型：`String`
默认：`md5`

指定生成文件内容哈希值的哈希方法。

### `[<hashType>:hash:<digestType>:<length>]`

类型：`String`

The hash of options.content (Buffer) (by default it's the hex digest of the hash).

#### `digestType`

类型：`String`
默认：`'hex'`

The [digest](https://en.wikipedia.org/wiki/Cryptographic_hash_function) that the
hash function should use. Valid values include: base26, base32, base36,
base49, base52, base58, base62, base64, and hex.

#### `hashType`

类型：`String`
默认：`'md5'`

The type of hash that the has function should use. Valid values include: `md5`,
`sha1`, `sha256`, and `sha512`.

#### `length`

类型：`Number`
默认：`undefined`

Users may also specify a length for the computed hash.

### `[N]`

类型：`String`
默认：`undefined`

The n-th match obtained from matching the current file name against the `regExp`.

## 示例

The following examples show how one might use `file-loader` and what the result would be.

**file.js**

```js
import png from './image.png';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'dirname/[hash].[ext]',
            },
          }
        ],
      },
    ],
  },
};
```

结果：

```bash
# result
dirname/0dcbbaa701328ae351f.png
```

---

**file.js**

```js
import png from './image.png';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[sha512:hash:base64:7].[ext]',
            },
          },
        ],
      },
    ],
  },
};
```

结果：

```bash
# result
gdyb21L.png
```

---

**file.js**

```js
import png from './path/to/file.png';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]?[hash]',
            },
          },
        ],
      },
    ],
  },
};
```

结果：

```bash
# result
path/to/file.png?e43b20c069c4a01867c31e98cbce33c9
```

## 贡献

如果你从未阅读过我们的贡献指南，请在上面花点时间。

[贡献指南](https://raw.githubusercontent.com/webpack-contrib/file-loader/master/.github/CONTRIBUTING.md)

## License

[MIT](https://raw.githubusercontent.com/webpack-contrib/file-loader/master/LICENSE)

[npm]: https://img.shields.io/npm/v/file-loader.svg
[npm-url]: https://npmjs.com/package/file-loader
[node]: https://img.shields.io/node/v/file-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/file-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/file-loader
[tests]: https://img.shields.io/circleci/project/github/webpack-contrib/file-loader.svg
[tests-url]: https://circleci.com/gh/webpack-contrib/file-loader
[cover]: https://codecov.io/gh/webpack-contrib/file-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/file-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=file-loader
[size-url]: https://packagephobia.now.sh/result?p=file-loader
