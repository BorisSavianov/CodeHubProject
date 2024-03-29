// api/check.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    const { exerciseId, answer, language } = req.body;
    const isCorrect = await checkAnswer(exerciseId, answer, language);

    if (isCorrect) {
      res.status(200).json({ message: "Правилен отговор!" });
    } else {
      res.status(400).json({ message: "Неправилен отговор. Опитай пак." });
    }
  } catch (error) {
    console.error("Internal Server Error:", error.message);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
}

async function checkAnswer(exerciseId, answer, language) {
  try {
    const apiKey = "919a40c063msh26ada2748d136ffp1cad1ejsn767bdb56ef44"; // Use environment variable

    // Map exerciseId to its specific invalid patterns
    const invalidPatterns = {
      1: ["eval(", "exec(", "while True:", "__import__(", "open("],
      2: ["eval(", "exec(", "while True:", "__import__(", "open("],
      3: ["unsafe", "Process.Start(", "File.WriteAllLines("],
      4: ["unsafe", "Process.Start(", "File.WriteAllLines("],
    };

    if (
      invalidPatterns[exerciseId].some((pattern) => answer.includes(pattern))
    ) {
      console.error(
        "Invalid submission: Detected potential loophole or unsafe code."
      );
      return false;
    }

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true" },
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        language_id: getLanguageId(language),
        source_code: Buffer.from(answer).toString("base64"),
        stdin: "",
        expected_output: "1\n2\n3\n4\n5\n",
        cpu_time_limit: 2,
        wall_time_limit: 5,
        memory_limit: 512000,
      },
    };

    const response = await axios.request(options);

    if (response.data.token) {
      let status = { id: 1, description: "In Queue" };
      let resultResponse;

      // Poll the Judge0 API until the status changes
      while (status.id === 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before polling again

        resultResponse = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}?base64_encoded=true`,
          {
            headers: {
              "X-RapidAPI-Key": apiKey,
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );

        status = resultResponse.data.status;
      }

      if (status.id === 4) {
        const result = Buffer.from(
          resultResponse.data.stdout,
          "base64"
        ).toString();
        console.log("Decoded Output:", result);

        const expectedOutputs = {
          1: "1\n2\n3\n4\n5\n",
          2: "1\n2\n3\n",
          3: "1\n2\n3\n4\n5\n",
          4: "1\n2\n3\n",
        };

        // Compare the decoded output with the expected sequence of numbers
        const expectedOutput = expectedOutputs[exerciseId];
        const isCorrect = result === expectedOutput;
        return isCorrect;
      } else {
        console.error("Judge0 API error:", resultResponse.data);
        return false;
      }
    } else {
      console.error("Judge0 API error:", response.data);
      return false;
    }
  } catch (error) {
    console.error("Judge0 API error:", error.message);
    return false;
  }
}

function getLanguageId(language) {
  const languageMap = {
    python: 71,
    csharp: 51,
    cpp: 14,
    java: 62,
    // Add more languages as needed
  };

  return languageMap[language] || 71; // Default to Python if not found
}
