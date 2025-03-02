// import { fetch, base64 } from "react-native-blob-util";

/**
 * Sends a POST request with the user's question and reads the response in chunks.
 * @param {string} question - The user's question or message.
 * @param {function} onChunk - A callback fired whenever we receive a new chunk of text.
 */
export async function getChunkedResponse(question, onChunk) {
    try {
      const baseUrl =  "http://127.0.0.1:8000";
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
            client_code: "gAAAAABnvXpVnm4xDWR18JTBQSPr3qjUKcmUK3ntm4AMzWG9QGgLwLJboPSm-m_BiXKYdZhfyOZ0oeDNDmB0Bz7cF70zA6OsL89XA076aMhocTeeewyLmnLvGuV3WDMTH2Wq3CYSj1Qs",
            domain_name: "effie.cx"
           
          };
      
        //  console.log("Sending payload:", payload);
    //     let partialResponse = "";

    //     const response = await fetch(
    //       "POST",
    //       `${baseUrl}/chat`,
    //       { "Content-Type": "application/json" },
    //       JSON.stringify(payload)
    //     );
    
    //     // ✅ Read the response stream
    //     response.readStream(
    //       "utf8",
    //       4096, // Chunk size (adjust if needed)
    //       (chunk) => {
    //         partialResponse += chunk;
    //         onChunk(partialResponse); // Pass new data to the callback
    //       },
    //       (error) => {
    //         console.error("Stream error:", error);
    //       },
    //       () => {
    //         console.log("Streaming completed.");
    //       }
    //     );
    //   } catch (err) {
    //     console.error("Error fetching stream:", err);
    //   }
    // }

      const response = await fetch(`${baseUrl}/chat`, {
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
  
