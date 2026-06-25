import { Agent } from "@google/adk";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import cron from "node-cron";
import dotenv from "dotenv";

dotenv.config();

// Initialize the MCP Client
async function setupMcpClient() {
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "@jtraderai/jtrader-mcp-server"],
    env: process.env, // Pass environment variables for API keys if needed
  });

  const client = new Client(
    { name: "jtrader-adk-cron", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );

  await client.connect(transport);
  return client;
}

// Wrap MCP tools into ADK compatible tools
async function getJTraderTools(mcpClient: Client) {
  // @ts-ignore - Ignoring strict types for MCP list response
  const { tools } = await mcpClient.request({ method: "tools/list" });
  
  return tools.map((tool: any) => ({
    name: tool.name,
    description: tool.description,
    // ADK relies on standard function wrapping
    execute: async (args: any) => {
      const response = await mcpClient.request({
        method: "tools/call",
        params: { name: tool.name, arguments: args }
      });
      // @ts-ignore
      return response.content;
    }
  }));
}

async function runAgent() {
  console.log("Starting daily JTrader analysis...");
  
  try {
    const mcpClient = await setupMcpClient();
    const jtraderTools = await getJTraderTools(mcpClient);

    // Initialize the ADK Agent
    const agent = new Agent({
      model: "gemini-1.5-pro",
      tools: jtraderTools,
      systemInstruction: "You are an autonomous trading analyst. Use your tools to fetch the latest market reports, summarize key insights, and decide on actionable steps."
    });

    const prompt = "Check JTrader for the latest report. Summarize the key actionable insights and output a recommendation.";
    
    // Execute the agent run
    const response = await agent.run(prompt);
    console.log("=== JTRADER DAILY REPORT ===");
    console.log(response.text);
    
    // TODO: Act on the insights
    // e.g., sendEmail(response.text) or executeTrade(response.recommendation)
    
  } catch (error) {
    console.error("Agent execution failed:", error);
  }
}

// Schedule the task to run every morning at 4:30 AM PST
// Note: CRON assumes server local time. Ensure your server timezone is PST.
// 30 4 * * * -> 4:30 AM daily
cron.schedule("30 4 * * *", () => {
  console.log("Cron triggered at 4:30 AM.");
  runAgent();
}, {
  scheduled: true,
  timezone: "America/Los_Angeles"
});

console.log("ADK Cron Agent is running. Scheduled for 4:30 AM PST daily.");
// To run it immediately for testing, uncomment the line below:
// runAgent();
