export const sendMessageToAI = async (
  userInput: string,
  resume: File | null,
  jobDescription: File | null
): Promise<string> => {
  try {
    const url = "https://api.vectorshift.ai/api/pipelines/run";
    const data = new FormData();
    data.append("pipeline_name", "Interview Simulator ");
    data.append("username", "reno123");
    data.append("User_input", userInput);

    // Add resume and job description files if they exist
    if (resume) {
      data.append("resume", resume);
    }
    if (jobDescription) {
      data.append("job_description", jobDescription);
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Api-Key": "YOUR_API_KEY", // Replace this with your actual API key
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