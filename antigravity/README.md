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
        "JTRADER_API_KEY": "your_api_key_here_if_needed",
        "JTRADER_WALLET_PRIVATE_KEY": "0xYourWalletPrivateKeyHere",
        "JTRADER_REQUIRE_APPROVAL": "true"
      }
    }
  }
}
```

> **⚠️ SECURITY WARNING:** Never commit this configuration file if it contains a real private key. Your private key should remain secure and only be stored in your local environment.

## Usage

When pairing with Antigravity, simply tell the agent to use JTrader. The agent will read the schemas and execute the tools directly.

**Example Prompt:**
> "Agy, use the JTrader MCP tools to analyze TSLA and implement a new signal handler in my `agent.py` based on the data."
