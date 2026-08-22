/* AI Copilot types — based on Architecture.md §11 */

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  recommendations?: AIRecommendation[];
}

export interface AIRecommendation {
  id: string;
  type: 'activity' | 'schedule' | 'budget' | 'general';
  title: string;
  description: string;
  impact?: AIRecommendationImpact;
  status: 'pending' | 'accepted' | 'dismissed';
}

export interface AIRecommendationImpact {
  before: string;
  after: string;
}

export interface AICopilotRequest {
  tripId: string;
  message: string;
}

export interface AICopilotResponse {
  message: AIMessage;
}
