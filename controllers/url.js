const { nanoid } = require('nanoid');
const URL = require('../models/url')

const getNanoId = async (size = 8) => {
    const { nanoid } = await import('nanoid');
    return nanoid(size);
};


async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body || !body.url) return res.status(400).json({ message: "url is required" });

    const shortID = getNanoId(8);

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: []
    })

    return res.json({ id: shortID });
}

async function handleRedirectURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                },
            }
        }
    );
    return res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = { handleGenerateNewShortURL, handleRedirectURL, handleGetAnalytics };