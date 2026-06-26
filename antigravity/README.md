# Antigravity Setup for JTrader MCP

[Antigravity](https://github.com/google/antigravity) (Agy) is an advanced agentic coding assistant that can utilize MCP servers to interact with external tools like JTrader.

## Setup Instructions

To use this server with Google Antigravity, add the configuration to your global `mcp_config.json` (typically located in `~/.gemini/config/mcp_config.json` on Windows/Linux or `~/.config/gemini/mcp_config.json` on macOS).

1. **Edit `mcp_config.json`:**
   Add the following configuration to the `mcpServers` object in the file. Create the file if it does not exist.

```json
{
  "mcpServers": {
    "jtrader": {
      "command": "npx",
      "args": [
        "-y",
        "@jtrader.ai/mcp"
      ],
      "env": {
        "JTRADER_API_KEY": "your_api_key_here",
        "JTRADER_WALLET_PRIVATE_KEY": "0xYourWalletPrivateKeyHere_if_using_x402",
        "JTRADER_REQUIRE_APPROVAL": "true"
      }
    }
  }
}
```

> **Configuration Note:** JTrader requires a Wallet Private Key if you want your agent to make **new purchases**.
> * **Linked Account (API Key + Wallet):** Set `JTRADER_API_KEY` to authenticate as your human account (bypassing paywalls for reports you already own). Set `JTRADER_WALLET_PRIVATE_KEY` so the agent can pay for new reports on your behalf.
> * **Fully Autonomous (Wallet Only):** Leave `JTRADER_API_KEY` empty. Set `JTRADER_WALLET_PRIVATE_KEY` to let the agent create its own identity and pay for reports itself.

> **⚠️ SECURITY WARNING:** Never commit this configuration file if it contains a real private key. Your private key should remain secure and only be stored in your local environment.

## Usage

When pairing with Antigravity, simply tell the agent to use JTrader. The agent will read the schemas and execute the tools directly.

**Example Prompt:**
> "Agy, use the JTrader MCP to list the recent research reports. Find the one with the highest conviction score, extract the primary thesis, and implement a new trading signal handler in my `agent.py` based on its data."
