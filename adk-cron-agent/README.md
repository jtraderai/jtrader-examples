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
   JTRADER_API_KEY="your_jtrader_api_key_here" # Optional if you are providing a wallet private key for SIWX
   JTRADER_WALLET_PRIVATE_KEY="0xYourWalletPrivateKeyHere"
   JTRADER_REQUIRE_APPROVAL="false"
   JTRADER_MAX_SPEND_LIMIT="2.0"
   JTRADER_MAX_SESSION_SPEND="5.0"
   ```
   > **⚠️ SECURITY WARNING:** Never commit your `.env` file if it contains a real private key. Your private key should remain secure and only be stored in your local environment.

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

> **Note:** For executing real trades, the JTrader MCP works best when paired with an agent trading service like the [Robinhood MCP](https://robinhood.com/us/en/support/articles/trading-with-your-agent/).

## Disclaimer

*   **We are not affiliated with Robinhood.**
*   **These examples are for educational purposes only. They do not constitute financial advice.** Always review your agent's code and test with small amounts or testnets before deploying real capital.
