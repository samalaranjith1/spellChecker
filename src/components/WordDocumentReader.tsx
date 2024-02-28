import { useState, ChangeEvent } from "react";
import mammoth from "mammoth";
import TextCorrectionComponent from "./TextCorrectionComponent ";

const WordDocumentReader = () => {
  const [content, setContent] = useState<string>("");
  const [textContent, setTextContent] = useState<string>("");

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      if (!arrayBuffer) return;

      const result = await mammoth.convertToHtml({ arrayBuffer });
      setContent(result.value);

      const htmlString = result.value; // Assuming result.value contains <p> Hello world </p> <p>Welcome to new world</p>

      // Create a temporary DOM element
      const tempElement = document.createElement("div");
      tempElement.innerHTML = htmlString;

      // Get the text content
      const textContent = tempElement.textContent || tempElement.innerText;

      setTextContent(textContent.trim());
      console.log(textContent.trim()); // Outputs: "Hello world Welcome to new world"

      console.log(result.value); // Log the converted HTML content
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <TextCorrectionComponent initialText={textContent} />
      <input type="file" onChange={handleFileChange} />
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        contentEditable="true"
        spellCheck="true"
      />
    </div>
  );
};

export default WordDocumentReader;
