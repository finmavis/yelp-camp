const sanitizeHtml = require("sanitize-html");

const sanitizeConfig = {
    allowedTags: [],
    allowedAttributes: [],
    selfClosing: [],
    allowedSchemes: [],
    allowedSchemesByTag: {},
    allowProtocolRelative: false,
    allowedIframeHostnames: []
};

const sanitize = (input) => sanitizeHtml(input, sanitizeConfig);

module.exports = sanitize;