import { useState } from "react";

type Correction = {
  changeFrom: string;
  changeTo: string;
  reason: "Spelling" | "Grammar";
};

type TextCorrectionProps = {
  responseChoice: {
    message: {
      function_call: {
        arguments: Correction[];
      };
    };
  };
};

const TextCorrectionComponent1: React.FC<TextCorrectionProps> = ({
  responseChoice,
}) => {
  const [filteredCorrections, setFilteredCorrections] = useState<Correction[]>(
    []
  );

  // Filter out corrections based on reason category
  const filterCorrections = (reason: "Spelling" | "Grammar") => {
    if (responseChoice?.message?.function_call?.arguments) {
      const filtered = responseChoice.message.function_call.arguments.filter(
        (correction) => correction.reason === reason
      );
      setFilteredCorrections(filtered);
    }
  };

  // Render buttons for each type of error
  const renderButtons = () => {
    if (responseChoice?.message?.function_call?.arguments) {
      return (
        <div>
          <ul>
            {responseChoice.message.function_call.arguments.map(
              (correction, index) => (
                <div key={index}>
                  <li>
                    <strong>Change From:</strong> {correction.changeFrom}
                    <br />
                    <strong>Change To:</strong> {correction.changeTo}
                    <br />
                    <strong>Reason:</strong> {correction.reason}
                  </li>
                  {correction.reason === "Spelling" && (
                    <button onClick={() => filterCorrections("Spelling")}>
                      Fix Spelling Errors
                    </button>
                  )}
                  {correction.reason === "Grammar" && (
                    <button onClick={() => filterCorrections("Grammar")}>
                      Fix Grammatical Errors
                    </button>
                  )}
                </div>
              )
            )}
          </ul>
        </div>
      );
    }
    return null;
  };

  // Render corrected text for each category
  const renderCorrectedText = () => {
    return (
      <div>
        <h3>Corrected Spelling Errors:</h3>
        <ul>
          {filteredCorrections.map((correction, index) => (
            <li key={index}>
              {correction.changeFrom} - {correction.changeTo}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      {renderButtons()}
      {filteredCorrections.length > 0 && renderCorrectedText()}
    </div>
  );
};

export default TextCorrectionComponent1;
