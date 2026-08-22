export interface CopilotMessageRequest {
  tripId: string;
  message: string;
  tripContext?: any;
}

export class CopilotService {
  private getApiKey(): string {
    return (
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_GENAI_API_KEY ||
      ''
    );
  }

  async generateCopilotResponse(
    tripId: string,
    userMessage: string,
    tripContext?: any
  ) {
    const apiKey = this.getApiKey();
    const timestamp = new Date().toISOString();

    if (!apiKey) {
      return this.generateFallbackResponse(userMessage);
    }

    const systemPrompt = `You are the GlobeTrotter AI Travel Copilot — an expert, editorial travel curator and itinerary assistant.
Provide crisp, inspiring, highly actionable travel advice, pacing adjustments, local hidden gems, and budget suggestions.
Keep formatting clean using markdown (bullet points, bold text for places and suggestions).`;

    const contextPrompt = tripContext
      ? `Trip details: ${JSON.stringify(tripContext)}\n\nUser query: ${userMessage}`
      : `User query: ${userMessage}`;

    const modelsToTry = [
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-2.0-flash',
      'gemini-pro',
    ];

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\n${contextPrompt}` }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1000,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const candidateText =
            data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (candidateText) {
            return {
              message: {
                id: `ai-${Date.now()}`,
                role: 'assistant',
                content: candidateText,
                timestamp,
                recommendations: this.extractMockRecommendations(candidateText),
              },
            };
          }
        } else {
          const errorData = await response.text();
          console.warn(`Gemini model ${model} error:`, errorData);
        }
      } catch (err) {
        console.warn(`Attempt with ${model} failed:`, err);
      }
    }

    // Fallback if all Google API calls fail
    return this.generateFallbackResponse(userMessage);
  }

  private extractMockRecommendations(text: string) {
    const recs: any[] = [];
    if (text.toLowerCase().includes('suggest') || text.toLowerCase().includes('recommend') || text.toLowerCase().includes('visit')) {
      recs.push({
        id: `rec-${Date.now()}-1`,
        title: 'Curated Itinerary Suggestion',
        description: 'Explore recommended highlights tailored to your journey.',
        impact: 'High Experience Score',
        status: 'pending',
      });
    }
    return recs;
  }

  private generateFallbackResponse(message: string) {
    const lower = message.toLowerCase();
    let content = "I've reviewed your travel timeline. Consider setting aside leisurely mornings for local cafés and reserving afternoon slots for major landmarks to avoid peak crowds.";

    if (lower.includes('cost') || lower.includes('budget')) {
      content = "For budget optimization: booking transit passes 24 hours in advance and scheduling free museum days can save up to 25% of trip expenses.";
    } else if (lower.includes('activity') || lower.includes('suggest')) {
      content = "Top recommendations: Early sunrise walk at scenic viewpoints, boutique neighborhood dining, and an evening cultural tour.";
    }

    return {
      message: {
        id: `ai-fallback-${Date.now()}`,
        role: 'assistant',
        content,
        timestamp: new Date().toISOString(),
        recommendations: [
          {
            id: `rec-${Date.now()}-1`,
            title: 'Pacing Optimization',
            description: 'Balance intense sightseeing with open exploration windows.',
            impact: 'Better travel comfort',
            status: 'pending',
          },
        ],
      },
    };
  }
}

export const copilotService = new CopilotService();
