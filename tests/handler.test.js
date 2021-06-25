import * as handler from '../src/capture';

test('capture', async () => {
    const event = 'event';
    const context = 'context';
    const callback = (error, response) => {
        expect(response.statusCode).toEqual(200);
        expect(typeof response.body).toBe('string');
    };

    await handler.capture(event, context, callback);
});
