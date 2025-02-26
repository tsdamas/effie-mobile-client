/**
 * Sends a POST request with the user's question and reads the response in chunks.
 * @param {string} question - The user's question or message.
 * @param {function} onChunk - A callback fired whenever we receive a new chunk of text.
 */
export async function getChunkedResponse(question, onChunk) {
    try {
        const payload = {
            history: [
                {
                    "role": "user",
                    "content": "hi"
                },
                {
                    "role": "assistant",
                    "content": " Hello! How can I help you today?"
                },
                {
                    "role": "user",
                    "content": "I need some information about your clinic"
                },
                {
                    "role": "assistant",
                    "content": "Sure! Can you please specify what kind of information you're looking for? Are you interested in our services, our medical team, our equipment and technology, or our location and hours of operation?"
                }
            ],
            question,
            client_code: "INSERT_CLIENT_CODE",
            domain_name: "INSERT_DOMAIN_NAME",
          };
      
        //  console.log("Sending payload:", payload);


      const response = await fetch('INSERT_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      //"response.body" is a ReadableStream
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
  
      let partial = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break; //finished reading all chunks
        //decode the current chunk
        const chunkText = decoder.decode(value, { stream: true });
        partial += chunkText;
        //pass the accumulated text to our callback
        onChunk(partial);
      }
    } catch (err) {
      console.error('Error fetching stream:', err);
    }
  }
  
