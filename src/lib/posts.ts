export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
}

const posts: BlogPost[] = [
  {
    slug: "building-a-quant-trading-system",
    title: "Building a Multi-Factor Quant Trading System in Python",
    excerpt:
      "How I built a quantitative trading framework that combines six alpha factors with mean-variance portfolio optimization and automated execution via Alpaca.",
    content: `
<p>Today I'm open-sourcing a project I've been working on: a <strong>multi-factor quantitative trading system</strong> for medium-term US equities. You can find the full source code on <a href="https://github.com/yingwang/trade">GitHub</a>.</p>

<h2>What It Does</h2>

<p>The system evaluates stocks using a weighted composite score across six alpha factors:</p>

<ul>
  <li><strong>Momentum (30%)</strong> — Cross-sectional returns over 1/3/6/12 month periods, excluding the most recent month to avoid short-term reversals.</li>
  <li><strong>Trend (20%)</strong> — SMA 50/200 ratio to favor securities in sustained uptrends.</li>
  <li><strong>Value (15%)</strong> — Inverse P/E and P/B ratios to identify undervalued opportunities.</li>
  <li><strong>Mean Reversion (15%)</strong> — Bollinger Band z-scores to spot oversold conditions.</li>
  <li><strong>Volatility (10%)</strong> — 63-day realized volatility, preferring stability.</li>
  <li><strong>Quality (10%)</strong> — ROE, profit margins, and earnings growth metrics.</li>
</ul>

<p>It then constructs an optimized portfolio of up to 20 positions using mean-variance optimization, targeting 15% annualized volatility with monthly rebalancing.</p>

<h2>The Tech Stack</h2>

<p>The system is built entirely in Python. Market data comes from Yahoo Finance, with NumPy and Pandas handling data processing, SciPy running the optimization, and TA-Lib computing technical indicators. For execution, it integrates with the Alpaca brokerage API for both paper and live trading.</p>

<p>There's also a Jupyter notebook (Google Colab-compatible) for interactive analysis — equity curves, monthly return heatmaps, risk reports, and portfolio construction visualizations.</p>

<h2>Risk Management</h2>

<p>Risk controls are baked in at every level: position sizes are capped between 2-10%, sector concentration is limited to 30%, and there's drawdown monitoring with stop-loss implementation. The system enforces a minimum 21-trading-day interval between rebalances to avoid overtrading.</p>

<h2>How to Use It</h2>

<p>The CLI makes it straightforward:</p>

<ul>
  <li><code>python run.py backtest</code> — Run historical simulations</li>
  <li><code>python run.py signal</code> — View current alpha scores</li>
  <li><code>python paper_trade.py</code> — Execute or preview rebalancing</li>
</ul>

<p>There are also preset investment style configurations in <code>config.yaml</code> — growth/tech-focused (momentum-heavy), balanced, and defensive/income-oriented — so you can adapt the strategy to your risk tolerance.</p>

<h2>What's Next</h2>

<p>I plan to add more factor models, improve the backtesting engine with transaction cost modeling, and explore alternative data sources. If you're interested in quantitative finance or algorithmic trading, feel free to check out the <a href="https://github.com/yingwang/trade">repo</a> and open an issue or PR.</p>

<p><em>Disclaimer: This is for educational and research purposes only. Always paper trade first and never risk money you can't afford to lose.</em></p>
`,
    date: "2026-03-11",
    author: "Ying Wang",
    tags: ["python", "quant", "trading", "finance"],
  },
];

export function getAllPosts(): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return posts
    .filter((post) => post.tags.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}
