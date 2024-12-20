export const sendMessageToAI = async (
  input: string | File,
  resume: File | null,
  jobDescription: File | null
): Promise<string> => {
  try {
    const url = "https://api.vectorshift.ai/api/pipelines/run";
    const data = new FormData();

    // Append the input based on its type
    if (input instanceof File) {
      data.append("audio_input", input);
    } else {
      data.append("User_input", input);
    }

    // Add resume and job description files if they exist
    if (resume) {
      data.append("resume", resume);
    }
    if (jobDescription) {
      data.append("job_description", jobDescription);
    }

    data.append("pipeline_name", "Interview Simulator");
    data.append("username", "reno123");

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Api-Key": "sk_8V2P8AP0H8QWkCAwlM8VvP21HYtKaVj6yDKCI0kJhiZ8NXlx",
      },
      body: data,
    });

    if (!response.ok) {
      console.error("Error response status:", response.status);
      throw new Error('API request failed');
    }

    const result = await response.json();
    console.log("API Response:", result);

    if (result.output_1) {
      console.log("Displaying output_1 in UI:", result.output_1);
      return result.output_1;
    } else {
      console.error("No output_1 in response");
      return "I apologize, but I couldn't process that response. Could you please try again?";
    }
  } catch (error) {
    console.error('Error calling AI API:', error);
    return "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";
  }
};