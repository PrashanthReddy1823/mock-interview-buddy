export const sendMessageToAI = async (userInput: string): Promise<string> => {
  try {
    const url = "https://api.vectorshift.ai/api/pipelines/run";
    const data = new FormData();
    data.append("pipeline_name", "Interview Simulator ");
    data.append("username", "reno123");
    data.append("User_input", userInput);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Api-Key": process.env.VECTORSHIFT_API_KEY || '',
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const result = await response.json();
    return result.response || "I apologize, but I couldn't process that response. Could you please try again?";
  } catch (error) {
    console.error('Error calling AI API:', error);
    return "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";
  }
};