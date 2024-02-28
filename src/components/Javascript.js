import { OpenAIClient } from "@azure/openai";
import { InteractiveBrowserCredential } from "@azure/identity";

async function main() {
  const endpoint = "https://azureopenaispellchecker.openai.azure.com/";
  const client = new OpenAIClient(endpoint, new InteractiveBrowserCredential());

  const textToSummarize = `
    Two independent experiments reported their results this morning at CERN, Europe's high-energy physics laboratory near Geneva in Switzerland. Both show convincing evidence of a new boson particle weighing around 125 gigaelectronvolts, which so far fits predictions of the Higgs previously made by theoretical physicists.

    ""As a layman I would say: 'I think we have it'. Would you agree?"" Rolf-Dieter Heuer, CERN's director-general, asked the packed auditorium. The physicists assembled there burst into applause.
  :`;

  const summarizationPrompt = [
    `
    Summarize the following text.

    Text:
    """"""
    ${textToSummarize}
    """"""

    Summary:
  `,
  ];

  console.log(`Input: ${summarizationPrompt}`);

  const deploymentName = "text-davinci-003";

  const { choices } = await client.getCompletions(
    deploymentName,
    summarizationPrompt,
    {
      maxTokens: 64,
    }
  );
  const completion = choices[0].text;
  console.log(`Summarization: ${completion}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
