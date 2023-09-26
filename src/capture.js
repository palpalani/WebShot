// this module will be provided by the layer
const chromeLambda = require('chrome-aws-lambda');

// aws-sdk is always preinstalled in AWS Lambda in all Node.js runtimes
//const S3Client = require("aws-sdk/clients/s3");

// create an S3 client
//const s3 = new S3Client({region: process.env.S3_REGION});

// here starts our function!
exports.handler = async (event) => {
    try {
        // Default browser viewport size.
        const defaultViewport = {
            width: typeof event.width !== 'undefined' ? event.width : 600,
            height: typeof event.height !== 'undefined' ? event.height : 550,
        };

        // Launch a headless chrome browser.
        const browser = await chromeLambda.puppeteer.launch({
            args: chromeLambda.args,
            executablePath: await chromeLambda.executablePath,
            defaultViewport,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });

        // Open a new browser tab.
        const page = await browser.newPage();

        if (typeof event.html === 'undefined') {
            // Navigate to the page.
            await page.goto(event.url, { waitUntil: ['load', 'networkidle2'] });
        } else {
            await page.setContent(event.html, {
                waitUntil: ['load', 'networkidle2'],
            });
            //await page.emulateMedia('screen');
        }

        let options = {
            omitBackground: true,
        };

        // Take a screenshot.
        const buffer = await page.screenshot(options);

        /*
            // upload the image using the current timestamp as filename
            const result = await s3
              .upload({
                Bucket: process.env.S3_BUCKET,
                Key: `${Date.now()}.png`,
                Body: buffer,
                ContentType: "image/png",
                ACL: "public-read"
              })
              .promise();

            // return the uploaded image url
            return { url: result.Location };
          */
        await browser.close();

        return buffer.toString('base64');
    } catch (error) {
        return formatError(error);
    }
};

var formatError = function (error) {
    return {
        statusCode: error.statusCode,
        headers: {
            'Content-Type': 'text/plain',
            'x-amzn-ErrorType': error.code,
        },
        isBase64Encoded: false,
        body: error.code + ': ' + error.message,
    };
};