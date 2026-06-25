# JTrader MCP Examples

This repository contains examples and configuration guides for integrating the [JTrader MCP Server](https://github.com/jtraderai/jtrader-mcp-server) with various AI assistants and development environments.

The Model Context Protocol (MCP) allows AI models to securely access JTrader's research, data, and tools.

## Available Guides

*   [Claude Desktop](./claude/README.md) - How to add JTrader to Claude Desktop.
*   [Cursor](./cursor/README.md) - How to use JTrader as an MCP server in the Cursor IDE.
*   [Antigravity](./antigravity/README.md) - How to configure JTrader for Google's Antigravity agentic coding assistant.
*   [ADK Scheduled Agent](./adk-cron-agent/README.md) - A fully autonomous, persistent cron agent using the Google Agent Development Kit (ADK).

## General Prerequisites

Most integrations require you to provide the command to start the MCP server. If you have Node.js installed, the standard command is:
```bash
npx -y @jtrader.ai/mcp
```
*(If your server requires environment variables like API keys, be sure to set them in the respective configuration files.)*

## Advanced Execution

JTrader is a research engine. If you want your agent to act on its findings by executing real trades, JTrader MCP works best when paired with an agent trading service like the **Robinhood MCP**. You can read more about trading with your agent via Robinhood [here](https://robinhood.com/us/en/support/articles/trading-with-your-agent/).

## Disclaimer

*   **We are not affiliated with Robinhood.**
*   **These examples are for educational purposes only. They do not constitute financial advice.** Always review your agent's code and test with small amounts or testnets before deploying real capital.
