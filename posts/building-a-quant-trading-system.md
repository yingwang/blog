---
title: "Building a Multi-Factor Quant Trading System in Python"
excerpt: "How I built a quantitative trading framework that combines six alpha factors with mean-variance portfolio optimization and automated execution via Alpaca."
date: "2026-03-11"
author: "Ying Wang"
tags: ["python", "quant", "trading", "finance"]
---

Today I'm open-sourcing a project I've been working on: a **multi-factor quantitative trading system** for medium-term US equities. You can find the full source code on [GitHub](https://github.com/yingwang/trade).

## What It Does

The system evaluates stocks using a weighted composite score across six alpha factors:

- **Momentum (30%)** — Cross-sectional returns over 1/3/6/12 month periods, excluding the most recent month to avoid short-term reversals.
- **Trend (20%)** — SMA 50/200 ratio to favor securities in sustained uptrends.
- **Value (15%)** — Inverse P/E and P/B ratios to identify undervalued opportunities.
- **Mean Reversion (15%)** — Bollinger Band z-scores to spot oversold conditions.
- **Volatility (10%)** — 63-day realized volatility, preferring stability.
- **Quality (10%)** — ROE, profit margins, and earnings growth metrics.

It then constructs an optimized portfolio of up to 20 positions using mean-variance optimization, targeting 15% annualized volatility with monthly rebalancing.

## The Tech Stack

The system is built entirely in Python. Market data comes from Yahoo Finance, with NumPy and Pandas handling data processing, SciPy running the optimization, and TA-Lib computing technical indicators. For execution, it integrates with the Alpaca brokerage API for both paper and live trading.

There's also a Jupyter notebook (Google Colab-compatible) for interactive analysis — equity curves, monthly return heatmaps, risk reports, and portfolio construction visualizations.

## Risk Management

Risk controls are baked in at every level: position sizes are capped between 2-10%, sector concentration is limited to 30%, and there's drawdown monitoring with stop-loss implementation. The system enforces a minimum 21-trading-day interval between rebalances to avoid overtrading.

## How to Use It

The CLI makes it straightforward:

- `python run.py backtest` — Run historical simulations
- `python run.py signal` — View current alpha scores
- `python paper_trade.py` — Execute or preview rebalancing

There are also preset investment style configurations in `config.yaml` — growth/tech-focused (momentum-heavy), balanced, and defensive/income-oriented — so you can adapt the strategy to your risk tolerance.

## What's Next

I plan to add more factor models, improve the backtesting engine with transaction cost modeling, and explore alternative data sources. If you're interested in quantitative finance or algorithmic trading, feel free to check out the [repo](https://github.com/yingwang/trade) and open an issue or PR.

*Disclaimer: This is for educational and research purposes only. Always paper trade first and never risk money you can't afford to lose.*
