# Quick Start Guide

Get WebShot up and running in 5 minutes.

## Prerequisites

Ensure you have:
- Node.js 20.x or higher: `node --version`
- pnpm 10.x or higher: `pnpm --version` (install: `npm install -g pnpm`)
- AWS CLI configured: `aws configure`

## Installation

```bash
# Clone repository
git clone https://github.com/palpalani/webshot.git
cd webshot

# Install dependencies (takes ~45s first time, ~2s after)
pnpm install
```

## Local Testing

```bash
# Start local development server
pnpm start

# In another terminal, test the endpoint
curl -X POST http://localhost:3000/dev/capture \
  -H "Content-Type: application/json" \
  -d '{"html": "<html><body><h1>Hello WebShot!</h1></body></html>"}'
```

## Deployment

### Development Deployment
```bash
# Deploy to AWS dev stage
pnpm deploy

# Test your deployed function
curl -X POST https://YOUR-API-ID.execute-api.us-west-2.amazonaws.com/dev/capture \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

### Production Deployment
```bash
# Read deployment checklist first
cat DEPLOYMENT.md

# Deploy to production
pnpm deploy:prod
```

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm start` | Start local dev server |
| `pnpm lint` | Format code with Prettier |
| `pnpm package` | Package for AWS (without deploying) |
| `pnpm deploy` | Deploy to AWS dev stage |
| `pnpm deploy:prod` | Deploy to production |
| `pnpm remove` | Remove AWS deployment |

## API Usage Examples

### 1. Screenshot a URL
```bash
curl -X POST https://your-endpoint/capture \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "fullPage": true}'
```

### 2. Screenshot HTML Content
```bash
curl -X POST https://your-endpoint/capture \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<html><body><h1>Custom HTML</h1></body></html>",
    "width": 1920,
    "height": 1080
  }'
```

### 3. Email HTML Screenshot
```bash
curl -X POST https://your-endpoint/capture \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<!DOCTYPE html><html>..email html...</html>",
    "width": 600,
    "fullPage": true,
    "type": "png"
  }'
```

### 4. JPEG with Quality
```bash
curl -X POST https://your-endpoint/capture \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "type": "jpeg",
    "quality": 90
  }'
```

## Troubleshooting

### Installation Issues
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Deployment Issues
```bash
# Check AWS credentials
aws sts get-caller-identity

# View serverless logs
pnpm serverless logs -f capture --tail
```

### Build Issues
```bash
# Verify Node.js version
node --version  # Should be 20.x or higher

# Verify pnpm version
pnpm --version  # Should be 10.x or higher

# Test packaging
pnpm package
```

## Cost Expectations

- **First 1M requests/month:** FREE (AWS Free Tier)
- **10,000 screenshots/month:** ~$0.95
- **100,000 screenshots/month:** ~$9.50
- **No idle costs when not in use**

## Next Steps

1. ✅ Complete installation
2. ✅ Test locally
3. ✅ Deploy to AWS
4. 📖 Read [DEPLOYMENT.md](DEPLOYMENT.md) for production best practices
5. 📊 Set up monitoring in CloudWatch
6. 💰 Configure AWS Budgets alerts

## Documentation

- **[README.md](README.md)** - Comprehensive project documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide
- **[MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md)** - pnpm migration details
- **[PRODUCTION_READY.md](PRODUCTION_READY.md)** - Readiness checklist

## Support

- 🐛 [Report Issues](https://github.com/palpalani/webshot/issues)
- 💬 [Discussions](https://github.com/palpalani/webshot/discussions)
- 📧 Contact: See package.json for author info

---

**Happy Screenshotting!** 📸
