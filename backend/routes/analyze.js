const express = require('express');
const multer = require('multer');
const { GoogleGenAI } = require('@google/genai');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        detail: 'No receipt image was uploaded.'
      });
    }

    const base64Image = req.file.buffer.toString('base64');

    const prompt = `
You are Spendly's receipt expense analyzer.

Analyze the uploaded image. It may be:
- a normal shopping receipt
- a grocery bill
- a restaurant bill
- a handwritten or printed grocery/item list
- another clear expense document

Extract the expense information.

Rules:
1. Find the final payable/total amount if the image is a receipt.
2. If there is no final total but individual item prices are clearly visible,
   calculate the total from the visible prices.
3. Identify the most appropriate Spendly category.
4. Use one of these categories when appropriate:
   Food, Transport, Shopping, Bills, Entertainment, Health,
   Education, Savings, Heartspent, Other
5. Create a short note describing the purchase.
6. Do NOT guess information that cannot reasonably be determined.
7. If the image is too blurry, unreadable, or contains no identifiable
   expense information, return null values.

Return ONLY valid JSON in exactly this format:

{
  "amount": number or null,
  "category": "string" or null,
  "note": "string" or null
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: req.file.mimetype,
                data: base64Image
              }
            }
          ]
        }
      ]
    });

    let text = response.text.trim();

    // Remove markdown code fences if Gemini happens to return them.
    text = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const result = JSON.parse(text);

    if (
      result.amount === null ||
      !result.category
    ) {
      return res.status(422).json({
        detail: 'Could not clearly read this receipt.'
      });
    }

    result.amount = Number(result.amount);

    if (!Number.isFinite(result.amount) || result.amount <= 0) {
      return res.status(422).json({
        detail: 'Could not clearly determine the expense amount.'
      });
    }

    return res.json({
      amount: result.amount,
      category: result.category,
      note: result.note || ''
    });

  } catch (error) {
    console.error('Receipt analysis error:', error);

    return res.status(500).json({
      detail: 'Receipt analysis failed.'
    });
  }
});

module.exports = router;