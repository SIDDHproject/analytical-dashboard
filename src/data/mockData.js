// Seeds and telemetry generators for Vortex Analytics Dashboard

export const initialKPIs = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "$142,384",
    change: "+12.4%",
    isPositive: true,
    suffix: "",
    sparkline: [4000, 4200, 3800, 4500, 5100, 4800, 5200, 5500, 5900, 6100],
  },
  {
    id: "activeUsers",
    title: "Active Users",
    value: "14,892",
    change: "+8.2%",
    isPositive: true,
    suffix: "",
    sparkline: [12000, 12500, 11900, 13000, 13400, 13200, 13800, 14200, 14500, 14892],
  },
  {
    id: "conversions",
    title: "Conversion Rate",
    value: "2.84%",
    change: "+4.1%",
    isPositive: true,
    suffix: "%",
    sparkline: [2.1, 2.3, 2.2, 2.5, 2.6, 2.4, 2.7, 2.6, 2.8, 2.84],
  },
  {
    id: "serverLoad",
    title: "Server Latency",
    value: "42ms",
    change: "-14.3%",
    isPositive: true, // Lower latency is positive
    suffix: "ms",
    sparkline: [58, 55, 52, 49, 48, 50, 46, 44, 43, 42],
  },
];

// Generates 30 days of sales / transaction data
export const generateSalesData = () => {
  const data = [];
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - 30);

  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(baseDate);
    currentDate.setDate(baseDate.getDate() + i);
    const dateStr = currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    
    // Add some realistic weekly cycle
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const multiplier = isWeekend ? 0.75 : 1.1;

    const baseRevenue = 3000 + Math.sin(i * 0.5) * 1000 + Math.random() * 800;
    const revenue = Math.round(baseRevenue * multiplier);
    const transactions = Math.round((revenue / (30 + Math.random() * 10)) * (1 + Math.random() * 0.1));
    const adSpend = Math.round(revenue * 0.12 + Math.random() * 150);

    data.push({
      date: dateStr,
      Revenue: revenue,
      Transactions: transactions,
      AdSpend: adSpend,
    });
  }
  return data;
};

export const initialDemographics = [
  { name: "Direct", value: 3400, color: "var(--accent-primary)" },
  { name: "Organic Search", value: 4500, color: "#10b981" },
  { name: "Referral", value: 2100, color: "var(--accent-secondary)" },
  { name: "Paid Campaigns", value: 1800, color: "#f59e0b" },
];

export const performanceData = [
  { subject: "Marketing", A: 120, B: 110, fullMark: 150 },
  { subject: "Sales", A: 98, B: 130, fullMark: 150 },
  { subject: "Tech Support", A: 86, B: 130, fullMark: 150 },
  { subject: "Operations", A: 99, B: 100, fullMark: 150 },
  { subject: "Product Development", A: 140, B: 90, fullMark: 150 },
  { subject: "R&D", A: 115, B: 85, fullMark: 150 },
];

export const recentTransactions = [
  {
    id: "TXN-9402",
    customer: "Elena Rostova",
    type: "Premium Subscription",
    amount: 149.00,
    status: "Completed",
    date: "2026-06-20",
    email: "elena.r@cloudmail.net",
    country: "Germany",
    method: "Credit Card",
    risk: "Low"
  },
  {
    id: "TXN-9401",
    customer: "Marcus Aurelius",
    type: "API License Renew",
    amount: 899.00,
    status: "Completed",
    date: "2026-06-20",
    email: "marcus.a@stoicenterprises.com",
    country: "Italy",
    method: "Wire Transfer",
    risk: "Low"
  },
  {
    id: "TXN-9400",
    customer: "Sarah Jenkins",
    type: "Basic Monthly Plan",
    amount: 29.00,
    status: "Failed",
    date: "2026-06-19",
    email: "sjenks@gmail.com",
    country: "USA",
    method: "PayPal",
    risk: "Medium"
  },
  {
    id: "TXN-9399",
    customer: "Takashi Kovacs",
    type: "Enterprise Add-on",
    amount: 450.00,
    status: "Completed",
    date: "2026-06-19",
    email: "t.kovacs@harlan.world",
    country: "Japan",
    method: "Credit Card",
    risk: "Low"
  },
  {
    id: "TXN-9398",
    customer: "Amara Okoye",
    type: "Premium Subscription",
    amount: 149.00,
    status: "Processing",
    date: "2026-06-19",
    email: "amara@matrix-sys.io",
    country: "Nigeria",
    method: "Bank Transfer",
    risk: "Low"
  },
  {
    id: "TXN-9397",
    customer: "Liam O'Connor",
    type: "Consulting Hour",
    amount: 300.00,
    status: "Completed",
    date: "2026-06-18",
    email: "liam@dublintech.ie",
    country: "Ireland",
    method: "Stripe",
    risk: "High"
  },
  {
    id: "TXN-9396",
    customer: "Chao Zhang",
    type: "Enterprise License",
    amount: 2400.00,
    status: "Completed",
    date: "2026-06-18",
    email: "zhang.chao@tencent-cloud.cn",
    country: "China",
    method: "Alipay",
    risk: "Low"
  },
  {
    id: "TXN-9395",
    customer: "Chloe Bourgeois",
    type: "Refund Request",
    amount: -149.00,
    status: "Completed",
    date: "2026-06-17",
    email: "chloe.queen@paris-style.fr",
    country: "France",
    method: "PayPal",
    risk: "Medium"
  }
];

export const logEventPool = [
  { message: "API endpoint GET /api/v1/telemetry reached. Status 200 OK.", type: "info" },
  { message: "Purchase complete: TXN-9402 by Elena Rostova. Amount $149.", type: "success" },
  { message: "Database read latency spiked to 120ms (Threshold: 100ms).", type: "warning" },
  { message: "Failed transaction: TXN-9400 by Sarah Jenkins. Reason: Card Declined.", type: "error" },
  { message: "New user sign up: David Kim (dkim@seoultech.kr) from South Korea.", type: "info" },
  { message: "Scheduled backups completed: 14.8GB uploaded to S3 bucket.", type: "success" },
  { message: "Webhook delivery to Slack channel failed. Retrying in 5s...", type: "warning" },
  { message: "High bandwidth usage detected on European gateway edge CDN.", type: "warning" },
  { message: "API endpoint POST /api/v1/auth status 201 Created.", type: "success" },
  { message: "Rate limit exceeded for IP 192.168.42.110 (150 req/min).", type: "error" }
];

// Generates dynamic AI insights based on the current sandbox parameters
export const getAIInsights = (traffic, conversionRate, budget, serverLoad) => {
  const insights = [];

  // Traffic analysis
  if (traffic > 18000) {
    insights.push({
      type: "success",
      title: "Traffic Wave Detected",
      description: `Active visitors represent a ${Math.round((traffic / 14892 - 1) * 100)}% spike. Organic channels are driving high-quality inbound signals.`
    });
  } else if (traffic < 11000) {
    insights.push({
      type: "warning",
      title: "Low Visual Telemetry",
      description: "Active visitor counts have fallen below optimal thresholds. Suggest active ad boost to prime the acquisition pipeline."
    });
  } else {
    insights.push({
      type: "info",
      title: "Healthy Traffic Pipeline",
      description: "Traffic remains stable within the 12,000 - 15,000 user envelope, showing sustainable brand engagement."
    });
  }

  // Conversion rate analysis
  if (conversionRate > 3.5) {
    insights.push({
      type: "success",
      title: "Hyper-Efficient Checkout",
      description: `Conversion rate at ${conversionRate}% is operating at peak efficiency. Cart abandonment has dropped by 18% due to UI optimizations.`
    });
  } else if (conversionRate < 2.0) {
    insights.push({
      type: "error",
      title: "Friction in Checkout Funnel",
      description: `Conversion rate dropped to ${conversionRate}%. Audit Stripe integration and check for layout friction on mobile gateways.`
    });
  } else {
    insights.push({
      type: "info",
      title: "Standard Conversions",
      description: `At ${conversionRate}%, user acquisition is standard. Increase personalization elements to nudge it past 3.0%.`
    });
  }

  // Budget efficiency
  const ROI = Math.round((conversionRate * traffic * 45) / budget);
  if (ROI > 5) {
    insights.push({
      type: "success",
      title: "Outstanding Ad-Spend ROI",
      description: `Est. ROI index is ${ROI}x. High conversions relative to active budget of $${budget}/day. Scaling spend is highly recommended.`
    });
  } else if (ROI < 2) {
    insights.push({
      type: "warning",
      title: "Budget Saturation",
      description: `Low ROI relative to daily ad spend of $${budget}. Ad targeting may be too broad. Tighten parameters on paid social search.`
    });
  } else {
    insights.push({
      type: "info",
      title: "Stable Acquisition Margin",
      description: `ROI ratio is balanced at ${ROI}x. Budget allocation matches lead quality and platform margins.`
    });
  }

  // Infrastructure latency
  if (serverLoad > 65) {
    insights.push({
      type: "error",
      title: "Infrastructure Latency Alert",
      description: `Server latency has crested to ${serverLoad}ms. API rate limits should be enforced, and edge nodes scaled to offset degradation.`
    });
  } else if (serverLoad < 35) {
    insights.push({
      type: "success",
      title: "System Telemetry Stable",
      description: `Response time of ${serverLoad}ms indicates exceptional database index performance and ample compute overhead.`
    });
  } else {
    insights.push({
      type: "info",
      title: "Optimal Infrastructure Health",
      description: `Latency of ${serverLoad}ms is within normal operating parameters (30ms - 50ms).`
    });
  }

  return insights;
};
