# Beast

Beast is Screenshot as a Service using Nodejs, Chrome and Aws Lamda.
Convert a webpage to an image using headless Chrome
Takes screenshot of any given `URL/Html content` and returns `base64` encoded
buffer.

Memory allotted `2GB`.

This project uses the
[serverless-bundle](https://github.com/AnomalyInnovations/serverless-bundle)
plugin and the [serverless-offline](https://github.com/dherault/serverless-offline) plugin.
It supports:

- **Generating optimized Lambda packages with Webpack**
- **Using ES6 or TypeScript in your handler functions**
- **Run API Gateway locally**
    - Use `serverless offline start`
- **Support for unit tests**
    - Run `npm test` to run your tests
- **Sourcemaps for proper error messages**
    - Error message show the correct line numbers
    - Works in production with CloudWatch
- **Lint your code with ESLint**
- **Add environment variables for your stages**
- **No need to manage Webpack or Babel configs**

---

### Requirements

- [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Installation

To create a new Serverless project.

``` bash
$ serverless install --url [git repo ur] --name my-project
```

Enter the new directory

``` bash
$ cd my-project
```

Install the Node.js packages

``` bash
$ npm install
```

### Usage

To run a function on your local

``` bash
$ serverless invoke local --function hello
```

To simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline)

``` bash
$ serverless offline start
```

## Installation

```shell
yarn install
```

serverless.yml running command:

```shell
sls deploy
```

If any changes need environment setting, Change the value in 
serverless.yml file and rerun the sls deploy command.
