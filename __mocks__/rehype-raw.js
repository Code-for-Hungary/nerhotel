const rehypeRaw = jest.mock('rehype-raw', () => jest.fn(() => {}));
module.exports = rehypeRaw;