# Scheduled ADK Agent with JTrader MCP

This example demonstrates how to build an autonomous, persistent agent using the Google Agent Development Kit (ADK) in TypeScript.

It connects to the JTrader MCP server and uses `node-cron` to automatically wake up every morning at 4:30 AM PST, check for the latest JTrader reports, and generate an actionable summary.

## Prerequisites

- Node.js (v18+)
- A Google Gemini API Key

## Setup

1. **Install Dependencies**
   Navigate to this directory and run:
   ```bash
   npm install
   ```

2. **Configure Environment**
   Create a `.env` file in this directory and add your necessary API keys.
   ```bash
   GEMINI_API_KEY="your_google_gemini_api_key"
   JTRADER_API_KEY="your_jtrader_api_key_if_needed"
   ```

## Running the Agent

To start the persistent cron agent:

```bash
npm start
```

You will see a message:
`ADK Cron Agent is running. Scheduled for 4:30 AM PST daily.`

Leave this process running. Every morning at 4:30 AM, it will automatically connect to the MCP server, execute the agent loop, and log the report.

### Testing Immediately
If you don't want to wait until 4:30 AM, open `agent.ts` and uncomment the `runAgent()` call at the very bottom of the file, then run `npm start` again.

## Modifying the Action

This script currently logs the output to the console. To integrate your own execution logic (e.g., executing a trade on a broker or sending an email alert), modify the `// TODO: Act on the insights` section in `agent.ts`.
