# WebShot

> Cost-Effective Screenshot-as-a-Service using Node.js, headless Chrome, and AWS Lambda

WebShot is a serverless screenshot service that converts webpages or HTML content to images using headless Chrome on AWS Lambda. Built on a true pay-per-use model, WebShot eliminates infrastructure costs when idle and scales automatically with demand, making it the most cost-effective solution for screenshot automation.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-20.x-green.svg)](https://nodejs.org)
[![pnpm](https://img.shields.io/badge/pnpm-10.x-orange.svg)](https://pnpm.io)
[![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-orange.svg)](https://aws.amazon.com/lambda/)
[![Serverless](https://img.shields.io/badge/Serverless-Framework-red.svg)](https://www.serverless.com/)

## Features

- **Cost Optimization** - Pay only per execution (< $0.0001/request), zero cost when idle
- **URL or HTML Screenshots** - Capture any webpage or custom HTML content
- **Email Screenshot Support** - Perfect for rendering email HTML content as images
- **Multiple Image Formats** - PNG, JPEG, and WebP support
- **High Performance** - 2GB memory allocation with 30-second timeout
- **Flexible Configuration** - Customize viewport, quality, clipping, and more
- **Modern Chrome** - Uses latest Chromium (v140) with Puppeteer
- **Serverless Architecture** - Auto-scales from zero to thousands of requests
- **Developer-Friendly** - Local development with serverless-offline
- **Optimized Bundles** - Webpack optimization with serverless-bundle
- **No Infrastructure Management** - No servers to maintain or patch

## Cost Optimization Benefits

WebShot leverages AWS Lambda's serverless architecture to provide **significant cost savings** compared to traditional screenshot services:

### Pay-Per-Use Model
- **No Idle Costs**: Pay absolutely nothing when not in use
- **Micro-Billing**: Charged only for actual execution time (rounded to nearest 1ms)
- **No Minimum Fees**: No monthly minimums or reserved capacity requirements

### Cost Breakdown Example
With AWS Lambda pricing (us-west-2):
- **Memory**: 2048 MB (2 GB)
- **Average Execution**: ~2-3 seconds per screenshot
- **Cost per request**: ~$0.00008 (less than 1/100th of a cent)
- **1,000 screenshots/month**: ~$0.08
- **10,000 screenshots/month**: ~$0.80
- **100,000 screenshots/month**: ~$8.00

> **Free Tier**: AWS Lambda includes 1 million free requests per month and 400,000 GB-seconds of compute time, making WebShot **completely free** for small to medium usage.

### Comparison with Traditional Services

| Solution | Monthly Cost (10k screenshots) | Idle Cost | Scaling |
|----------|-------------------------------|-----------|---------|
| **WebShot (Serverless)** | ~$0.80 | $0 | Automatic |
| Dedicated EC2 (t3.medium) | ~$30 | $30 | Manual |
| Managed Screenshot Service | ~$50-200 | $50+ | Limited |
| Self-Hosted Server | ~$20-100 | $20+ | Manual |

### Additional Cost Savings
- **No Server Maintenance**: Eliminate DevOps overhead and server management costs
- **No Over-Provisioning**: Pay only for actual usage, never for unused capacity
- **Built-in Redundancy**: No need to pay for backup servers or load balancers
- **Automatic Scaling**: Handle traffic spikes without paying for peak capacity 24/7
- **No Software Licenses**: Use open-source Chromium and Puppeteer

## Table of Contents

- [Cost Optimization Benefits](#cost-optimization-benefits)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- [Node.js 20.x](https://nodejs.org/) or later
- [pnpm 10.x](https://pnpm.io/) or later (recommended package manager)
- [AWS CLI](https://aws.amazon.com/cli/) configured with appropriate credentials
- AWS Account with Lambda and API Gateway permissions

### Installing Prerequisites

```bash
# Install pnpm globally (if not already installed)
npm install -g pnpm

# Verify pnpm installation
pnpm --version

# Configure AWS credentials
aws configure
```

> **Note:** Serverless Framework is included as a dev dependency and does not need to be installed globally.

## Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/palpalani/webshot.git
cd webshot

# Install dependencies using npm
npm install --legacy-peer-deps

# OR using pnpm (recommended for better dependency management)
pnpm install
```

> **Note:**
> - When using npm, the `--legacy-peer-deps` flag is required due to peer dependency conflicts
> - pnpm handles peer dependencies more efficiently and is fully compatible with this project
> - All npm commands in the documentation can be replaced with pnpm equivalents (e.g., `pnpm start`, `pnpm test`)

## Quick Start

### Local Development

Start the local development server:

```bash
pnpm start
```

The API will be available at `http://localhost:3000`

### Test the Function Locally

```bash
pnpm serverless invoke local --function capture --data '{"url": "https://example.com"}'
```

### Deploy to AWS

```bash
pnpm deploy
```

After deployment, you'll receive an API endpoint URL that you can use to invoke the function.

## Migrating from npm to pnpm

If you previously used npm with this project, follow these steps to migrate to pnpm:

```bash
# 1. Remove npm artifacts
rm -rf node_modules package-lock.json

# 2. Install pnpm globally (if not installed)
npm install -g pnpm

# 3. Install dependencies with pnpm
pnpm install

# 4. Verify everything works
pnpm lint
pnpm package

# 5. Update your deployment scripts
# Use 'pnpm deploy' instead of 'npm run deploy'
# Use 'pnpm start' instead of 'npm start'
```

**Benefits of pnpm:**
- Faster installations (uses hard links instead of copying files)
- Better disk space efficiency (shared dependency storage)
- Stricter dependency resolution (prevents phantom dependencies)
- No need for `--legacy-peer-deps` flag
- Automatic peer dependency installation

## API Reference

### Handler Parameters

The `capture` function accepts the following parameters in the event object:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | string | - | URL to screenshot (required if `html` not provided) |
| `html` | string | - | HTML content to screenshot (required if `url` not provided) |
| `width` | number | 1280 | Viewport width in pixels |
| `height` | number | 720 | Viewport height in pixels |
| `fullPage` | boolean | false | Capture full scrollable page |
| `type` | string | 'png' | Image format: 'png', 'jpeg', or 'webp' |
| `quality` | number | - | Image quality (0-100, only for jpeg/webp) |
| `clip` | object | - | Clip region: `{x, y, width, height}` |
| `omitBackground` | boolean | true | Transparent background for PNG |
| `encoding` | string | 'base64' | Return encoding: 'base64' or 'binary' |

### Response Format

**Success:**
```json
{
  "data": "base64-encoded-image-string"
}
```

**Error:**
```json
{
  "statusCode": 500,
  "headers": {
    "Content-Type": "text/plain",
    "x-amzn-ErrorType": "InternalServerError"
  },
  "isBase64Encoded": false,
  "body": "Error: Error message details"
}
```

## Configuration

### Environment Variables

Configure environment variables in [serverless.yml](serverless.yml):

```yaml
provider:
  environment:
    CHROME_ARGS: '--disable-gpu,--disable-dev-shm-usage,--disable-setuid-sandbox,--no-sandbox,--no-zygote,--single-process'
```

### Memory and Timeout

Adjust Lambda memory and timeout settings in [serverless.yml](serverless.yml):

```yaml
provider:
  memorySize: 2048  # 2GB
  timeout: 30       # 30 seconds
```

### AWS Region

Change the deployment region in [serverless.yml](serverless.yml):

```yaml
provider:
  region: us-west-2  # Change to your preferred region
```

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` / `pnpm start` | Start local development server |
| `npm test` / `pnpm test` | Run test suite |
| `npm run lint` / `pnpm lint` | Format code with Prettier |

### Project Structure

```
webshot/
├── src/
│   └── capture.js           # Main Lambda handler
├── serverless.yml           # Serverless configuration
├── package.json             # Dependencies and scripts
├── README.md                # This file
└── .eslintrc.js            # ESLint configuration
```

### Tech Stack

- **Runtime:** Node.js 20.x
- **Package Manager:** pnpm 10.x
- **Browser:** Chromium 140.0.0 (@sparticuz/chromium)
- **Automation:** Puppeteer Core 24.24.0
- **Framework:** Serverless Framework 3.40.0
- **Bundler:** Webpack (via serverless-bundle)
- **Local Testing:** serverless-offline
- **Code Quality:** ESLint, Prettier

## Deployment

### Deploy to AWS

```bash
# Deploy to default stage (dev)
pnpm deploy

# Deploy to production
pnpm deploy:prod

# Deploy to specific region
pnpm serverless deploy --region eu-west-1

# Package only (without deploying)
pnpm package
```

### Remove Deployment

```bash
pnpm remove
# or
pnpm serverless remove --stage production
```

### View Logs

```bash
# Tail logs
pnpm serverless logs -f capture --tail

# View recent logs
pnpm serverless logs -f capture
```

### Production Deployment Checklist

For production deployments, refer to [DEPLOYMENT.md](DEPLOYMENT.md) for a comprehensive checklist including:
- Pre-deployment verification steps
- Security best practices
- Post-deployment testing
- Monitoring setup
- Rollback procedures

## Examples

### 1. Basic URL Screenshot

```json
{
  "url": "https://example.com"
}
```

### 2. Full Page Screenshot

```json
{
  "url": "https://example.com",
  "fullPage": true
}
```

### 3. Custom Viewport with JPEG

```json
{
  "url": "https://example.com",
  "width": 1920,
  "height": 1080,
  "type": "jpeg",
  "quality": 90
}
```

### 4. HTML Content Screenshot

```json
{
  "html": "<html><body><h1>Hello World</h1></body></html>",
  "width": 800,
  "height": 600
}
```

### 4a. Email HTML Screenshot

WebShot is ideal for converting email HTML content to images. Simply pass your email HTML as the `html` parameter:

```json
{
  "html": "<!DOCTYPE html><html><head><style>body{font-family:Arial,sans-serif;background-color:#f4f4f4;padding:20px;}.email-container{background-color:#ffffff;padding:30px;border-radius:8px;max-width:600px;margin:0 auto;}.header{color:#333;border-bottom:2px solid #007bff;padding-bottom:10px;}.content{margin:20px 0;color:#555;line-height:1.6;}.button{background-color:#007bff;color:#ffffff;padding:10px 20px;text-decoration:none;border-radius:5px;display:inline-block;margin-top:10px;}</style></head><body><div class='email-container'><h1 class='header'>Welcome to Our Service</h1><div class='content'><p>Hello,</p><p>Thank you for signing up. We're excited to have you on board!</p><a href='#' class='button'>Get Started</a></div></div></body></html>",
  "width": 600,
  "fullPage": true
}
```

**Note:** WebShot accepts HTML content directly as a parameter. EML file format is not supported - you must extract and pass the HTML content from your email source.

### 5. Clipped Region Screenshot

```json
{
  "url": "https://example.com",
  "clip": {
    "x": 0,
    "y": 0,
    "width": 500,
    "height": 500
  }
}
```

### 6. WebP with Transparent Background

```json
{
  "url": "https://example.com",
  "type": "webp",
  "quality": 80,
  "omitBackground": true
}
```

### Using with cURL

```bash
# Local development
curl -X POST http://localhost:3000/dev/capture \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'

# Production endpoint
curl -X POST https://your-api-gateway-url/capture \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "fullPage": true}'
```

## Troubleshooting

### Common Issues

**Issue: Lambda timeout**
- Increase timeout in [serverless.yml](serverless.yml) (max 900 seconds)
- Reduce page complexity or disable `fullPage`

**Issue: Memory limit exceeded**
- Increase `memorySize` in [serverless.yml](serverless.yml)
- Consider splitting large screenshots

**Issue: Chrome crashes**
- Verify Chrome args in environment variables
- Ensure sufficient memory allocation (minimum 2GB recommended)

**Issue: Installation fails**
- Use `npm install --legacy-peer-deps`
- Clear npm cache: `npm cache clean --force`

### Debug Mode

Enable verbose logging by adding to your function:

```javascript
chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**palPalani** - [GitHub](https://github.com/palpalani)

## Acknowledgments

- [Puppeteer](https://pptr.dev/) - Headless Chrome Node.js API
- [@sparticuz/chromium](https://github.com/Sparticuz/chromium) - Modern Chromium for AWS Lambda
- [Serverless Framework](https://www.serverless.com/) - Serverless application framework
- [serverless-bundle](https://github.com/AnomalyInnovations/serverless-bundle) - Webpack optimization plugin
- [serverless-offline](https://github.com/dherault/serverless-offline) - Local development plugin

## Support

If you encounter any issues or have questions:

- Open an [issue](https://github.com/palpalani/webshot/issues)
- Check existing [discussions](https://github.com/palpalani/webshot/discussions)

---

**Made with care using Serverless and AWS Lambda | Save 90%+ on screenshot costs**
