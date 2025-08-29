const Detection = require('../model/Detection');
const analyzeText = require('../services/huggingfaceService');

exports.detectNews = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "text is required" });
    }

    try {
        // 'result' is an object like { type: 'fake news', confidence: 0.99 }
        const result = await analyzeText(text);

        // 👇 FIX: Use the properties directly from the result object
        const newDetection = new Detection({
            text,
            result: result.type,
            confidence: `${(result.confidence * 100).toFixed(2)}%`
        });

        await newDetection.save();
        res.json(newDetection);

    } catch (err) {
        console.error("❌ Controller Error:", err.message);
        res.status(500).json({ error: "Fake news detection failed" });
    }
};