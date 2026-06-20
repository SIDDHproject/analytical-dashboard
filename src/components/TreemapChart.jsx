import { Treemap, ResponsiveContainer } from 'recharts';

const CustomizedContent = (props) => {
  const { x, y, width, height, index, name, value } = props;

  // Render nothing if dimensions are too small to avoid overlap
  if (width < 45 || height < 30) return null;

  // Alter colors dynamically using indexes
  const getBlockFill = (idx) => {
    if (idx === 0) return 'var(--accent-primary)';
    if (idx === 1) return 'var(--accent-secondary)';
    if (idx === 2) return '#10b981'; // green-500
    if (idx === 3) return '#f59e0b'; // amber-500
    if (idx === 4) return '#8b5cf6'; // violet-500
    return 'var(--bg-tertiary)';
  };

  const blockColor = getBlockFill(index);
  const isBright = index < 5;
  
  // High contrast text colors: dark text on bright boxes, white text on dark boxes
  const textColor = isBright ? '#060713' : '#ffffff';
  const percentageColor = isBright ? 'rgba(6, 7, 19, 0.85)' : 'rgba(255, 255, 255, 0.9)';
  const subLabelColor = isBright ? 'rgba(6, 7, 19, 0.6)' : 'rgba(255, 255, 255, 0.6)';

  // Determine what labels to show based on container height
  const showName = height >= 30;
  const showValue = height >= 50;
  const showSubLabel = height >= 68;

  // Character limit for name label based on container width
  const maxChars = Math.floor(width / 8.5);
  const displayName = name.length > maxChars 
    ? `${name.slice(0, Math.max(3, maxChars - 2))}..` 
    : name;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={6}
        ry={6}
        className="transition-all duration-300 hover:opacity-95 cursor-pointer"
        style={{
          fill: blockColor,
          stroke: 'var(--bg-secondary)',
          strokeWidth: 2,
          opacity: 0.8,
        }}
      />
      
      {/* Category Name Label */}
      {showName && (
        <text
          x={x + 10}
          y={showValue ? y + 22 : y + (height / 2) + 4}
          fill={textColor}
          stroke="none"
          fontSize={13}
          fontWeight="800"
          className="font-sans select-none tracking-tight"
          style={{ pointerEvents: 'none' }}
        >
          {displayName}
        </text>
      )}

      {/* Percentage value */}
      {showValue && (
        <text
          x={x + 10}
          y={showSubLabel ? y + 39 : y + 42}
          fill={percentageColor}
          stroke="none"
          fontSize={11}
          fontWeight="bold"
          className="font-mono select-none"
          style={{ pointerEvents: 'none' }}
        >
          {value}%
        </text>
      )}

      {/* Sub-label placeholder text */}
      {showSubLabel && (
        <text
          x={x + 10}
          y={y + 54}
          fill={subLabelColor}
          stroke="none"
          fontSize={9}
          fontWeight="bold"
          className="font-sans select-none uppercase tracking-wider"
          style={{ pointerEvents: 'none' }}
        >
          Sub-Label
        </text>
      )}
    </g>
  );
};

export default function TreemapChart({ data }) {
  const defaultData = [
    { name: 'Direct Channels', value: 28 },
    { name: 'Fick Titans Marketing', value: 23 },
    { name: 'Organic Search', value: 22 },
    { name: 'Hierarchical Node', value: 19 },
    { name: 'Sub-Category B Ads', value: 18 },
    { name: 'Erovelal Economy', value: 5 },
    { name: 'Other Options', value: 5 }
  ];

  const chartData = data || defaultData;

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col h-[280px] w-full card-inner-static relative overflow-hidden">
      <div className="text-left w-full mb-3">
        <h2 className="text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
          Decision-Making Drivers
        </h2>
      </div>

      {/* Recharts Treemap Container */}
      <div className="flex-1 w-full text-[10px]">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={chartData}
            dataKey="value"
            stroke="var(--bg-secondary)"
            fill="var(--accent-primary)"
            content={<CustomizedContent />}
            isAnimationActive={true}
          />
        </ResponsiveContainer>
      </div>
    </div>
  );
}
