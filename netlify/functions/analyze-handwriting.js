exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { imageData } = JSON.parse(event.body);

        if (!imageData) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'No image data provided' })
            };
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            {
                                text: `Analyze this handwriting sample and provide constructive feedback. Focus on:
1. Letter formation and consistency
2. Spacing between letters and words
3. Alignment and baseline consistency
4. Overall legibility
5. Specific letters that need improvement
6. Positive aspects to encourage

Keep the tone friendly and encouraging. Provide 3-5 actionable tips for improvement.`
                            },
                            {
                                inline_data: {
                                    mime_type: "image/jpeg",
                                    data: imageData
                                }
                            }
                        ]
                    }]
                })
            }
        );

        const result = await response.json();
        const analysis = result.candidates[0].content.parts[0].text;

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                analysis: analysis
            })
        };

    } catch (error) {
        console.error('Error analyzing handwriting:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to analyze handwriting',
                details: error.message
            })
        };
    }
};