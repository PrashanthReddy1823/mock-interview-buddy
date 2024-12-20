export const sendMessageToAI = async (
    userInput: string,
    resume: File | null,
    jobDescription: File | null
  ): Promise<string> => {
    try {
      const url = "https://api.vectorshift.ai/api/pipelines/run";
      const data = new FormData();
  
      // Prepare input data in the same way as Python (JSON format for inputs)
      const inputs = JSON.stringify({
        User_input: userInput
      });
      console.log(userInput)
  
      data.append("inputs", inputs);
      data.append("pipeline_name", "Interview Simulator");
      data.append("username", "reno123");
  
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Api-Key": "sk_8V2P8AP0H8QWkCAwlM8VvP21HYtKaVj6yDKCI0kJhiZ8NXlx", // Replace this with your actual API key
        },
        body: data,
      });
  
      if (!response.ok) {
        console.error("Error response status:", response.status); // Debugging: log response status
        throw new Error('API request failed');
      }
  
      const result = await response.json();
      console.log("API Response:", result); // Debugging: log the full API response
  
      if (result.output_1) {
        console.log("Displaying output_1 in UI:", result.output_1); // Debugging: log the response for output_1
        return result.output_1; // Return the output_1 value to be displayed
      } else {
        console.error("No output_1 in response"); // Debugging: handle case when output_1 is missing
        return "I apologize, but I couldn't process that response. Could you please try again?";
      }
    } catch (error) {
      console.error('Error calling AI API:', error); // Debugging: log errors
      return "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";
    }
  };
  
