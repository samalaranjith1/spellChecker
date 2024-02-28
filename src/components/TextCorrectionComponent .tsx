import { useState } from "react";
import OpenAI, { ClientOptions } from "openai";
// import TextCorrectionComponent1 from "./TextCorrectionComponent1";
import { OpenAIClient } from "@azure/openai";

type Correction = {
  changeFrom: string;
  changeTo: string;
  reason: "Grammar" | "Spelling";
};

const apiKey = ""; // Type-casting apiKey

interface TextCorrectionProps {
  initialText: string; // Define props interface with initialText
}

const TextCorrectionComponent: React.FC<TextCorrectionProps> = ({
  initialText,
}) => {
  const [textToCheck, setTextToCheck] = useState<string>(initialText); // Use initialText as initial state
  const [corrections, setCorrections] = useState<Correction[]>([]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextToCheck(event.target.value);
  };

  const makeCorrections = async () => {
    const openai = new OpenAI(apiKey, {} as ClientOptions);
    const prompt =
      "Correct the spelling and grammatical errors in the following text and if text length is more than 500 words then summarize it to 100 words:\n\n";

    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          role: "user",
          content: prompt + textToCheck,
        },
      ],
      functions: [
        {
          name: "makeCorrections",
          description:
            "Makes spelling or grammar corrections to a body of text",
          parameters: {
            type: "object",
            properties: {
              replacements: {
                type: "array",
                description: "Array of corrections",
                items: {
                  type: "object",
                  properties: {
                    changeFrom: {
                      type: "string",
                      description: "The word or phrase to change",
                    },
                    changeTo: {
                      type: "string",
                      description: "The new word or phrase to replace it with",
                    },
                    reason: {
                      type: "string",
                      description: "The reason this change is being made",
                      enum: ["Grammar", "Spelling"],
                    },
                  },
                },
              },
            },
          },
        },
      ],
      function_call: { name: "makeCorrections" },
    });

    const [responseChoice] = gptResponse.choices;
    if (responseChoice?.message?.function_call?.arguments) {
      const args: Correction[] =
        responseChoice.message.function_call.arguments.map((arg: any) => ({
          changeFrom: arg.changeFrom,
          changeTo: arg.changeTo,
          reason: arg.reason as "Grammar" | "Spelling",
        }));
      setCorrections(args);
    }
  };

  type Correction = {
    changeFrom: string;
    changeTo: string;
    reason: "Grammar" | "Spelling";
  };

  type GPTResponse = {
    message: {
      function_call: {
        arguments: Correction[];
      };
    };
  };
  const response1: GPTResponse = {
    message: {
      function_call: {
        arguments: [
          {
            changeFrom: "We",
            changeTo: "We",
            reason: "Grammar",
          },
          {
            changeFrom: "it",
            changeTo: "have",
            reason: "Grammar",
          },
          {
            changeFrom: "attetion",
            changeTo: "attention",
            reason: "Spelling",
          },
          {
            changeFrom: "pleesing",
            changeTo: "pleasing",
            reason: "Spelling",
          },
          {
            changeFrom: "vibtant",
            changeTo: "vibrant",
            reason: "Spelling",
          },
          {
            changeFrom: "someting",
            changeTo: "something",
            reason: "Spelling",
          },
          {
            changeFrom: "expectaions",
            changeTo: "expectations",
            reason: "Spelling",
          },
        ],
      },
    },
  };
  return (
    <div>
      {/* <TextCorrectionComponent1 responseChoice={response1} /> */}
      <textarea
        value={initialText || textToCheck}
        onChange={handleTextChange}
        placeholder="Enter text to check..."
        rows={10}
        cols={50}
        contentEditable={true}
        spellCheck={true}
      />
      <br />
      <button onClick={makeCorrections}>Check and Correct</button>
      <div>
        <h3>Corrections:</h3>
        <ul>
          {corrections.map((correction, index) => (
            <li key={index}>
              {correction.changeFrom} ➡️ {correction.changeTo} (
              {correction.reason})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TextCorrectionComponent;
