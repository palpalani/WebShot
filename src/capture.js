const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

exports.handler = async (event) => {
    let browser = null;

    try {
        const {
            url,
            html,
            width = 1280,
            height = 720,
            fullPage = false,
            type = 'png',
            quality,
            clip,
            omitBackground = true,
            encoding = 'base64',
        } = event;

        // Validate input
        if (!url && !html) {
            throw new Error('Either url or html parameter is required');
        }

        // Configure viewport
        const defaultViewport = {
            width: parseInt(width, 10),
            height: parseInt(height, 10),
        };

        // Launch headless Chrome browser
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });

        const page = await browser.newPage();

        // Navigate to URL or set HTML content
        if (html) {
            await page.setContent(html, {
                waitUntil: ['load', 'networkidle2'],
            });
        } else {
            await page.goto(url, {
                waitUntil: ['load', 'networkidle2'],
            });
        }

        // Build screenshot options
        const screenshotOptions = {
            type,
            omitBackground,
            fullPage,
        };

        // Add quality for jpeg/webp
        if ((type === 'jpeg' || type === 'webp') && quality) {
            screenshotOptions.quality = parseInt(quality, 10);
        }

        // Add clip if provided
        if (clip) {
            screenshotOptions.clip = {
                x: parseInt(clip.x, 10),
                y: parseInt(clip.y, 10),
                width: parseInt(clip.width, 10),
                height: parseInt(clip.height, 10),
            };
        }

        // Add encoding
        if (encoding) {
            screenshotOptions.encoding = encoding;
        }

        // Take screenshot
        const screenshot = await page.screenshot(screenshotOptions);

        await browser.close();
        browser = null;

        // Return based on encoding
        if (encoding === 'base64') {
            return screenshot;
        }

        return screenshot.toString('base64');
    } catch (error) {
        if (browser) {
            await browser.close();
        }

        return formatError(error);
    }
};

const formatError = (error) => {
    return {
        statusCode: error.statusCode || 500,
        headers: {
            'Content-Type': 'text/plain',
            'x-amzn-ErrorType': error.code || 'InternalServerError',
        },
        isBase64Encoded: false,
        body: `${error.code || 'Error'}: ${error.message}`,
    };
};