// Generates high-resolution PNG architecture diagram images from React Flow nodes and edges

export interface DiagramNode {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data: {
    label: string;
    type: string;
    icon?: string;
    sublabel?: string;
  };
}

export interface DiagramEdge {
  id: string;
  source: string;
  target: string;
}

export function generateArchitectureDiagramDataUrl(
  nodes: DiagramNode[],
  edges: DiagramEdge[],
  projectName: string
): string {
  if (typeof document === 'undefined') return '';

  const scale = 2; // High-DPI 2x scale
  const canvasWidth = 1050;
  const canvasHeight = 860;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth * scale;
  canvas.height = canvasHeight * scale;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.scale(scale, scale);

  // 1. Background
  const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  gradient.addColorStop(0, '#061525');
  gradient.addColorStop(1, '#0a1d33');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 2. Subtle grid pattern
  ctx.strokeStyle = 'rgba(30, 41, 59, 0.45)';
  ctx.lineWidth = 1;
  const gridSize = 24;
  for (let x = 0; x < canvasWidth; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();
  }
  for (let y = 0; y < canvasHeight; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }

  // 3. Top Banner
  ctx.fillStyle = 'rgba(13, 41, 67, 0.85)';
  ctx.fillRect(0, 0, canvasWidth, 60);

  ctx.fillStyle = '#1683F7';
  ctx.fillRect(0, 0, canvasWidth, 3);

  ctx.font = 'bold 16px sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('ARCHITECH AI', 24, 28);

  ctx.font = 'bold 10px monospace';
  ctx.fillStyle = '#00E5FF';
  ctx.fillText('SYSTEM ARCHITECTURE TOPOLOGY BLUEPRINT', 160, 28);

  ctx.font = 'bold 12px sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(projectName.toUpperCase(), 24, 48);

  ctx.font = '10px monospace';
  ctx.fillStyle = '#10B981';
  ctx.fillText('[STATUS: VERIFIED SPECIFICATION • MULTI-ROLE RBAC & ISOLATED TABLES]', canvasWidth - 430, 48);

  // Node dimension constants
  const nodeW = 185;
  const nodeH = 58;

  // Build node coordinate map
  const nodeMap = new Map<string, { x: number; y: number; node: DiagramNode }>();
  nodes.forEach((n) => {
    // Offset Y by banner height (60)
    const renderX = n.position.x + 30;
    const renderY = n.position.y + 40;
    nodeMap.set(n.id, { x: renderX, y: renderY, node: n });
  });

  // 4. Draw Edges / Connecting Lines
  edges.forEach((edge) => {
    const src = nodeMap.get(edge.source);
    const tgt = nodeMap.get(edge.target);
    if (!src || !tgt) return;

    const startX = src.x + nodeW / 2;
    const startY = src.y + nodeH;
    const endX = tgt.x + nodeW / 2;
    const endY = tgt.y;

    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(startX, startY);

    // Smooth cubic curve
    const deltaY = endY - startY;
    const cp1Y = startY + deltaY * 0.5;
    const cp2Y = endY - deltaY * 0.5;
    ctx.bezierCurveTo(startX, cp1Y, endX, cp2Y, endX, endY);
    ctx.stroke();

    // Arrowhead at destination
    ctx.fillStyle = '#38BDF8';
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - 4, endY - 7);
    ctx.lineTo(endX + 4, endY - 7);
    ctx.closePath();
    ctx.fill();
  });

  // 5. Draw Nodes
  nodes.forEach((n) => {
    const pos = nodeMap.get(n.id);
    if (!pos) return;

    const x = pos.x;
    const y = pos.y;
    const type = n.data.type || 'backend';

    let borderColor = '#64748B';
    let bgColor = '#161F2E';
    let badgeColor = '#94A3B8';
    let badgeBg = 'rgba(100, 116, 139, 0.2)';

    if (type === 'frontend') {
      borderColor = '#2196FF';
      bgColor = '#0F2942';
      badgeColor = '#2196FF';
      badgeBg = 'rgba(33, 150, 255, 0.2)';
    } else if (type === 'backend') {
      borderColor = '#10B981';
      bgColor = '#0A2617';
      badgeColor = '#10B981';
      badgeBg = 'rgba(16, 185, 129, 0.2)';
    } else if (type === 'database') {
      borderColor = '#F59E0B';
      bgColor = '#2E1A0F';
      badgeColor = '#F59E0B';
      badgeBg = 'rgba(245, 158, 11, 0.2)';
    } else if (type === 'storage') {
      borderColor = '#00E5FF';
      bgColor = '#1B2533';
      badgeColor = '#00E5FF';
      badgeBg = 'rgba(0, 229, 255, 0.2)';
    } else if (type === 'ai') {
      borderColor = '#A855F7';
      bgColor = '#2A103D';
      badgeColor = '#A855F7';
      badgeBg = 'rgba(168, 85, 247, 0.2)';
    }

    // Node Box with rounded corners
    ctx.save();
    ctx.fillStyle = bgColor;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1.8;

    roundRect(ctx, x, y, nodeW, nodeH, 8);
    ctx.fill();
    ctx.stroke();

    // Type Badge
    ctx.fillStyle = badgeBg;
    roundRect(ctx, x + 8, y + 8, 65, 14, 3);
    ctx.fill();

    ctx.font = 'bold 8px monospace';
    ctx.fillStyle = badgeColor;
    ctx.fillText(type.toUpperCase(), x + 12, y + 18);

    // Node Label
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#FFFFFF';
    const label = n.data.label.length > 22 ? n.data.label.substring(0, 20) + '...' : n.data.label;
    ctx.fillText(label, x + 8, y + 36);

    // Sublabel (if present)
    if (n.data.sublabel) {
      ctx.font = '9px monospace';
      ctx.fillStyle = '#94A3B8';
      const sublabel = n.data.sublabel.length > 25 ? n.data.sublabel.substring(0, 23) + '..' : n.data.sublabel;
      ctx.fillText(sublabel, x + 8, y + 49);
    }

    // Top and bottom connection port dots
    ctx.fillStyle = '#64748B';
    ctx.beginPath();
    ctx.arc(x + nodeW / 2, y, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + nodeW / 2, y + nodeH, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });

  // 6. Bottom Legend Bar
  ctx.fillStyle = 'rgba(6, 21, 37, 0.95)';
  ctx.fillRect(0, canvasHeight - 34, canvasWidth, 34);

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, canvasHeight - 34);
  ctx.lineTo(canvasWidth, canvasHeight - 34);
  ctx.stroke();

  const legendItems = [
    { label: 'Frontend Client', color: '#2196FF' },
    { label: 'Backend Microservice', color: '#10B981' },
    { label: 'Dedicated DB Table', color: '#F59E0B' },
    { label: 'AI LLM Engine', color: '#A855F7' },
    { label: 'Cloud Cache/Storage', color: '#00E5FF' },
    { label: 'User Actor / External', color: '#64748B' },
  ];

  let legendX = 24;
  ctx.font = 'bold 9px sans-serif';
  legendItems.forEach((item) => {
    ctx.fillStyle = item.color;
    ctx.fillRect(legendX, canvasHeight - 22, 10, 10);
    ctx.fillStyle = '#CBD5E1';
    ctx.fillText(item.label, legendX + 14, canvasHeight - 14);
    legendX += 160;
  });

  return canvas.toDataURL('image/png');
}

export function downloadArchitectureDiagramImage(
  nodes: DiagramNode[],
  edges: DiagramEdge[],
  scenarioId: string,
  projectName: string
) {
  const dataUrl = generateArchitectureDiagramDataUrl(nodes, edges, projectName);
  if (!dataUrl) return;

  const link = document.createElement('a');
  link.download = `ArchiTech-AI_${scenarioId}_Architecture_Diagram.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Canvas rounded rect helper
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
