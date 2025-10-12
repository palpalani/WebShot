const { handler } = require('../src/capture');

describe('Screenshot Handler', () => {
    test('should take screenshot from URL', async () => {
        const event = {
            url: 'https://example.com',
            width: 800,
            height: 600,
        };

        const result = await handler(event);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });

    test('should take screenshot from HTML content', async () => {
        const event = {
            html: '<html><body><h1>Test</h1></body></html>',
        };

        const result = await handler(event);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });

    test('should support full page screenshot', async () => {
        const event = {
            url: 'https://example.com',
            fullPage: true,
        };

        const result = await handler(event);
        expect(typeof result).toBe('string');
    });

    test('should support different image types', async () => {
        const event = {
            url: 'https://example.com',
            type: 'jpeg',
            quality: 80,
        };

        const result = await handler(event);
        expect(typeof result).toBe('string');
    });

    test('should support clip region', async () => {
        const event = {
            url: 'https://example.com',
            clip: {
                x: 0,
                y: 0,
                width: 500,
                height: 500,
            },
        };

        const result = await handler(event);
        expect(typeof result).toBe('string');
    });

    test('should return error when no url or html provided', async () => {
        const event = {};

        const result = await handler(event);
        expect(result.statusCode).toBe(500);
        expect(result.body).toContain('Either url or html parameter is required');
    });
});
