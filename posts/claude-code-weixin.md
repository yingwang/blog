---
title: "I Built a WeChat Channel Plugin for Claude Code"
excerpt: "claude-code-weixin brings Claude Code to WeChat — chat with your AI coding assistant directly from your phone, with support for text, images, files, voice, and video."
date: "2026-03-25"
author: "Ying Wang"
tags: ["claude-code", "wechat", "mcp", "typescript", "open-source"]
---

Claude Code has a built-in Telegram channel, but no WeChat support. Since WeChat is how I communicate day-to-day, I built [claude-code-weixin](https://github.com/yingwang/claude-code-weixin) — an open-source plugin that bridges WeChat and Claude Code using the Model Context Protocol (MCP).

Now I can message Claude from WeChat on my phone and get full Claude Code capabilities: code generation, file analysis, image recognition, and more — all from a chat window.

## What It Does

Messages flow bidirectionally between WeChat and your Claude Code session. You send a message in WeChat, it appears in Claude's context, Claude processes it, and the response comes back to WeChat. It supports:

- **Text** — with auto-chunking for messages over 4000 characters
- **Images** — Claude's vision capabilities kick in automatically
- **Documents** — PDFs, Word, Excel, and other files
- **Voice messages** — transcribed server-side
- **Video** — downloaded and analyzed

It works just like having Claude Code in your pocket.

## How It Works

The plugin is an MCP server that registers three tools with Claude Code:

- `reply` — send text back to WeChat
- `send_file` — upload and send media files
- `send_typing` — show a typing indicator

Under the hood, a long-polling monitor continuously checks for new messages via the iLink Bot API. When a message arrives, it validates the sender against an allowlist, then broadcasts a notification to Claude through the MCP channel protocol. Claude processes it with full context and responds using the registered tools.

The architecture is intentionally simple: polling-based message detection, stdio transport for MCP communication, and file-based configuration stored in `~/.claude/channels/weixin/`.

## Access Control

Security was a priority. You don't want random people chatting with your Claude session. The plugin uses a pairing-based access system:

1. An unknown user sends you a message
2. They receive a 6-character pairing code (expires in 1 hour)
3. You approve it in your terminal with `/weixin:access pair <code>`
4. They're added to the allowlist

You can also manage policies — block all DMs, require pairing, or allow specific users. The allowlist reloads on every message check, so changes take effect immediately.

## Getting Started

```bash
npx claude-channel-weixin install
npx claude-channel-weixin login
```

The login command displays a QR code in your terminal. Scan it with WeChat, and the bot token is saved securely. Then start Claude Code with the plugin:

```bash
claude --channels plugin:weixin@claude-code-weixin
```

That's it. Messages from approved WeChat users will start flowing into your Claude session.

## Multi-Bot Support

You can run multiple WeChat bots in a single Claude Code session. Each bot maintains separate message streams, configuration, and allowlists. Responses route through the correct bot instance automatically.

## What's Next

I'm planning to add group chat support, richer media handling, and better message threading. If you use WeChat and Claude Code, give it a try — feedback and PRs welcome on [GitHub](https://github.com/yingwang/claude-code-weixin).
