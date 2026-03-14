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
    slug: "daily-briefing-2026-03-14",
    title: "今日新闻简报 | 2026年3月14日",
    excerpt:
      "战火与博弈主导全球议程：美伊冲突白热化、全球股市承压、两会定调AI十万亿、美国301调查围堵中国、乌美俄和谈再度搁浅。",
    content: `
<h2>1. 美伊冲突白热化，霍尔木兹海峡实质关闭</h2>
<p>美军空袭伊朗石油命脉哈尔克岛，伊朗宣布封锁海峡，布油飙破103美元。特朗普3月13日宣布已指示中央司令部对伊朗哈尔克岛实施大规模空袭。伊朗革命卫队宣称海峡已关闭。布伦特原油飙至103.14美元创三年新高，国际能源署32国同意协调释放石油库存。</p>
<p><strong>看法：</strong>这不是有限度的军事打击，而是对伊朗经济命脉的直接绞杀。霍尔木兹海峡若长期受阻，油价破120只是时间问题。</p>
<h2>2. 全球股市集体承压，滞胀恐惧笼罩市场</h2>
<p>美股标普500跌0.61%至6632点，周线连跌创2025年3月以来最长纪录。港股恒指跌0.98%，A股深成指跌超3%。巴克莱将美联储降息预期推迟至9月。</p>
<p><strong>看法：</strong>市场核心矛盾已从衰退担忧切换为滞胀恐惧。对A股而言，两会后政策利好正被外部冲击稀释，短期油气和军工可能是少数确定性方向。</p>
<h2>3. 全国两会闭幕，AI产业十万亿目标明确</h2>
<p>发改委明确十五五末AI产业破10万亿元。工信部长强调人形机器人已从科技攻关走向场景落地。证监会部署深化创业板改革。</p>
<p><strong>看法：</strong>10万亿不是口号，而是产业动员令。具身智能和端侧AI是今年最明确的落地方向。</p>
<h2>4. 美国对华再挥301大棒，拉16国围堵产能过剩</h2>
<p>美贸易代表对含中国在内16个经济体发起301调查，商务部强硬回应。</p>
<p><strong>看法：</strong>拉上15个经济体是想把产能过剩叙事从双边升级为多边共识，比单纯加关税更值得警惕。</p>
<h2>5. 乌美俄三方会谈再度推迟</h2>
<p>美方坚持主场，俄方拒绝赴美，地点分歧导致会谈延期。</p>
<p><strong>看法：</strong>中东新战场打开后，美国外交资源被严重分散，俄乌谈判优先级实际在下降。</p>
<p><em>今日总基调：战火与博弈主导全球议程，中东是震源。</em></p>
<p><em>来源：新浪财经、新华网、东方财富网、商务部、外交部</em></p>
`,
    date: "2026-03-14",
    author: "Ying Wang",
    tags: ["news", "geopolitics", "markets", "china", "AI"],
  },
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
