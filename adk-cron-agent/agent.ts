import { LlmAgent, Gemini, InMemoryRunner, isFinalResponse, stringifyContent } from "@google/adk";
import { MCPToolset, StdioConnectionParams } from "@google/adk";
import cron from "node-cron";
import dotenv from "dotenv";

dotenv.config();

const mcpParams: StdioConnectionParams = {
  type: 'StdioConnectionParams',
  serverParams: {
    command: 'npx',
    args: ['-y', '@jtrader.ai/mcp'],
    env: process.env as Record<string, string>,
  }
};

async function runAgent() {
  console.log("Starting daily JTrader analysis...");
  
  const mcpToolset = new MCPToolset(mcpParams);
  
  try {
    const model = new Gemini({ model: "gemini-2.5-flash" });
    
    // Initialize the ADK Agent
    const agent = new LlmAgent({
      name: "jtrader_agent",
      model,
      tools: [mcpToolset],
      instruction: `You are an elite, autonomous quantitative trading analyst.
      
Your primary objective is to execute a daily research cycle by acquiring and analyzing financial intelligence.

You have access to the JTrader MCP, which provides tools to list, preview, and purchase proprietary research reports.
You operate fully autonomously and are authorized to spend up to your configured session limit in USDC to acquire reports.

Follow these strict guidelines:
1. Discover: Use the available tools to list recent reports. Identify the most critical report for the current date.
2. Evaluate: Fetch metadata or a preview for the identified report to determine if it contains actionable insights.
3. Acquire: If the report is deemed valuable, securely purchase the full report using your wallet. Ensure you stay within spending limits.
4. Synthesize: Analyze the full report data, extract the primary thesis, and formulate a clear, actionable trading recommendation.
5. Summarize: Your final response must include a bulleted summary of the report's insights, the confidence level of the thesis, and your final 'buy/sell/hold' recommendation. Keep the tone professional, objective, and analytical.`
    });

    const runner = new InMemoryRunner({ agent, appName: "jtrader_cron" });
    await runner.sessionService.createSession({ appName: "jtrader_cron", userId: "cron_user", sessionId: "session_1" });
    
    const prompt = "Check JTrader for the latest report. Summarize the key actionable insights and output a recommendation.";
    
    // Execute the agent run
    const stream = runner.runAsync({
      userId: "cron_user",
      sessionId: "session_1",
      newMessage: { role: "user", parts: [{ text: prompt }] }
    });
    
    console.log("=== JTRADER DAILY REPORT ===");
    for await (const event of stream) {
      if (isFinalResponse(event)) {
         console.log(stringifyContent(event));
      }
    }
    
    // TODO: Act on the insights
    
  } catch (error) {
    console.error("Agent execution failed:", error);
  } finally {
    await mcpToolset.close();
    console.log("MCP Client connection closed.");
  }
}

// Ensure proper cleanup on shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down ADK Cron Agent...');
  process.exit(0);
});

// Start the cron scheduler
// "30 4 * * *" means 4:30 AM every day
cron.schedule("30 4 * * *", () => {
  console.log("Cron triggered! Running ADK agent...");
  runAgent();
}, {
  scheduled: true,
  timezone: "America/Los_Angeles"
});

console.log("ADK Cron Agent is running. Scheduled for 4:30 AM PST daily.");

// Allow instant manual testing by passing --run-now or setting RUN_NOW=true
const isTestRun = process.argv.includes('--run-now') || process.env.RUN_NOW === 'true';
if (isTestRun) {
  console.log("Instant test mode triggered. Running agent immediately...");
  runAgent();
}
