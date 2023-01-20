const ReactMarkdown = jest.mock('react-markdown', () => jest.fn(() => {}));
module.exports = ReactMarkdown;