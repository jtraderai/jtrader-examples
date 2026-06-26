# Claude Desktop Setup for JTrader MCP

Claude Desktop has native support for the Model Context Protocol (MCP). By editing a single configuration file, you can give Claude full access to JTrader's capabilities.

## Setup Instructions

1.  Open your Claude Desktop configuration file:
    *   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
    *   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
2.  If the file does not exist or the folder is empty, create it.
3.  Add the configuration from the [claude_desktop_config.json](./claude_desktop_config.json) file found in this directory.

> **Configuration Note:** JTrader requires a Wallet Private Key if you want your agent to make **new purchases**.
> * **Linked Account (API Key + Wallet):** Set `JTRADER_API_KEY` to authenticate as your human account (bypassing paywalls for reports you already own). Set `JTRADER_WALLET_PRIVATE_KEY` so the agent can pay for new reports on your behalf.
> * **Fully Autonomous (Wallet Only):** Leave `JTRADER_API_KEY` empty. Set `JTRADER_WALLET_PRIVATE_KEY` to let the agent create its own identity and pay for reports itself.

4.  Fully restart Claude Desktop (Quit the application completely and reopen it).

## Verifying the Installation

Once Claude Desktop restarts, you should see a small "hammer" icon or an MCP connection indicator in the input bar.

Try sending the following prompt to Claude:
> "Use the JTrader MCP to find the most recent research report. Summarize the key findings and outline how I could trade this recommendation."
