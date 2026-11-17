import { jsPDF } from 'jspdf';
import type { Scenario } from '../data/demoScenarios';
import { generateArchitectureDiagramDataUrl } from './diagramImage';

export function exportArchitecturePdf(scenario: Scenario, isRefined: boolean = false) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let currentY = margin;

  // Colors
  const darkNavy = [6, 21, 37]; // #061525
  const cardBg = [13, 41, 67]; // #0D2943
  const primaryBlue = [22, 131, 247]; // #1683F7
  const cyanAccent = [0, 229, 255];
  const textWhite = [255, 255, 255];
  const textMuted = [148, 163, 184];
  const textDark = [30, 41, 59];
  const borderSlate = [51, 65, 85];
  const successGreen = [16, 185, 129];
  const warningOrange = [245, 158, 11];

  const checkPageBreak = (requiredHeight: number) => {
    if (currentY + requiredHeight > pageHeight - 22) {
      doc.addPage();
      drawRunningHeader();
      currentY = 25;
    }
  };

  const drawRunningHeader = () => {
    doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.rect(0, 0, pageWidth, 15, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.text('ARCHITECH AI', margin, 10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`System Architecture Specification | ${scenario.projectName}`, margin + 26, 10);
    doc.setDrawColor(borderSlate[0], borderSlate[1], borderSlate[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, 15, pageWidth - margin, 15);
  };

  // ==========================================
  // PAGE 1: TITLE BANNER & EXECUTIVE SUMMARY
  // ==========================================

  // Top Hero Header Block
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.rect(0, 0, pageWidth, 52, 'F');

  // Decorative accent line
  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
  doc.rect(0, 0, pageWidth, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('ARCHITECH AI', margin, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(cyanAccent[0], cyanAccent[1], cyanAccent[2]);
  doc.text('GENERATIVE & AGENTIC AI FOR ENTERPRISE SOFTWARE ARCHITECTURE', margin, 24);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text(scenario.projectName.toUpperCase(), margin, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(
    `Document Ref: ARC-${scenario.id.toUpperCase()}-2026 | Generated: ${new Date().toLocaleDateString()} | Status: ${isRefined ? 'Human-Refined Specification' : 'Approved AI Architecture'}`,
    margin,
    42
  );

  currentY = 60;

  // Section 1: Executive Specification & Scope
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('1. ARCHITECTURAL REQUIREMENT & DECOMPOSITION', margin, currentY);
  currentY += 4;

  doc.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
  doc.setLineWidth(0.8);
  doc.line(margin, currentY, margin + 45, currentY);
  currentY += 5;

  // Requirement Card Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  const reqLines = doc.splitTextToSize(scenario.requirement, contentWidth - 8);
  const boxHeight = reqLines.length * 4.2 + 8;
  doc.roundedRect(margin, currentY, contentWidth, boxHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text(reqLines, margin + 4, currentY + 6);
  currentY += boxHeight + 8;

  // Specification Key Matrix (4 Boxes)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('Core Decomposition & Personas', margin, currentY);
  currentY += 5;

  const cardW = (contentWidth - 6) / 2;
  const specItems = [
    { label: 'Application Domain', val: scenario.requirementsAnalysis.application },
    { label: 'User Roles & Personas', val: scenario.requirementsAnalysis.users },
    { label: 'Authentication & Security', val: scenario.requirementsAnalysis.authentication },
    { label: 'Core System Capabilities', val: scenario.requirementsAnalysis.coreFeatures },
  ];

  for (let i = 0; i < specItems.length; i += 2) {
    const item1 = specItems[i];
    const item2 = specItems[i + 1];

    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, currentY, cardW, 14, 1.5, 1.5, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.text(item1.label.toUpperCase(), margin + 3, currentY + 4.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const lines1 = doc.splitTextToSize(item1.val, cardW - 6);
    doc.text(lines1[0] || '', margin + 3, currentY + 9.5);

    if (item2) {
      doc.setFillColor(241, 245, 249);
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(margin + cardW + 6, currentY, cardW, 14, 1.5, 1.5, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      doc.text(item2.label.toUpperCase(), margin + cardW + 9, currentY + 4.5);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      const lines2 = doc.splitTextToSize(item2.val, cardW - 6);
      doc.text(lines2[0] || '', margin + cardW + 9, currentY + 9.5);
    }

    currentY += 17;
  }

  // ==========================================
  // PAGE 2: GENERATED VISUAL ARCHITECTURE TOPOLOGY
  // ==========================================
  doc.addPage();
  drawRunningHeader();
  currentY = 25;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('2. GENERATED VISUAL ARCHITECTURE BLUEPRINT (TOPOLOGY MAP)', margin, currentY);
  currentY += 4;

  doc.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
  doc.setLineWidth(0.8);
  doc.line(margin, currentY, margin + 45, currentY);
  currentY += 6;

  // Generate visual diagram image from the architecture graph
  const nodes = isRefined ? scenario.refinedArchitectureNodes : scenario.architectureNodes;
  const edges = isRefined ? scenario.refinedArchitectureEdges : scenario.architectureEdges;
  const diagramDataUrl = generateArchitectureDiagramDataUrl(nodes, edges, scenario.projectName);

  if (diagramDataUrl) {
    const imgWidth = contentWidth;
    const imgHeight = (imgWidth / 1050) * 860; // 1050x860 aspect ratio
    doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.roundedRect(margin, currentY, imgWidth, imgHeight, 2, 2, 'F');
    doc.addImage(diagramDataUrl, 'PNG', margin, currentY, imgWidth, imgHeight);
    currentY += imgHeight + 6;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text('Figure 1: Autonomous High-DPI Topology Rendering generated by ArchiTech AI Engine.', margin, currentY);
    currentY += 8;
  }

  // ==========================================
  // SECTION 3: SEPARATE DATABASE SCHEMAS & TABLES
  // ==========================================
  checkPageBreak(30);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('3. DATABASE ARCHITECTURE & DEDICATED TABLES', margin, currentY);
  currentY += 4;

  doc.setDrawColor(warningOrange[0], warningOrange[1], warningOrange[2]);
  doc.setLineWidth(0.8);
  doc.line(margin, currentY, margin + 45, currentY);
  currentY += 6;

  // Filter nodes that define tables
  const dbNodes = Object.entries(scenario.nodeDetails).filter(([_, details]) => details.tables && details.tables.length > 0);

  dbNodes.forEach(([nodeId, details]) => {
    const nodeObj = scenario.architectureNodes.find((n) => n.id === nodeId);
    const nodeTitle = nodeObj ? nodeObj.data.label : nodeId;

    checkPageBreak(28);

    doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.roundedRect(margin, currentY, contentWidth, 7, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
    doc.text(`SCHEMA / TABLE: ${nodeTitle.toUpperCase()}`, margin + 4, currentY + 4.8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(cyanAccent[0], cyanAccent[1], cyanAccent[2]);
    doc.text(`Engine: ${details.technology}`, pageWidth - margin - 50, currentY + 4.8);
    currentY += 8.5;

    if (details.accessControl) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.text('RBAC Authorization: ', margin + 2, currentY + 2);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const rbacLines = doc.splitTextToSize(details.accessControl, contentWidth - 36);
      doc.text(rbacLines, margin + 34, currentY + 2);
      currentY += rbacLines.length * 3.5 + 2;
    }

    if (details.tables) {
      details.tables.forEach((tblStr) => {
        const tblLines = doc.splitTextToSize(tblStr, contentWidth - 10);
        const tblBoxHeight = tblLines.length * 3.8 + 4;
        checkPageBreak(tblBoxHeight + 2);

        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(margin + 2, currentY, contentWidth - 4, tblBoxHeight, 1, 1, 'FD');

        doc.setFont('courier', 'normal');
        doc.setFontSize(7.2);
        doc.setTextColor(30, 41, 59);
        doc.text(tblLines, margin + 4, currentY + 3.5);
        currentY += tblBoxHeight + 2;
      });
    }

    currentY += 4;
  });

  // ==========================================
  // SECTION 4: CORE MICROSERVICES & APIS
  // ==========================================
  checkPageBreak(35);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('4. MICROSERVICES, AGENTS & API ENDPOINTS', margin, currentY);
  currentY += 4;

  doc.setDrawColor(successGreen[0], successGreen[1], successGreen[2]);
  doc.setLineWidth(0.8);
  doc.line(margin, currentY, margin + 45, currentY);
  currentY += 6;

  const serviceNodes = Object.entries(scenario.nodeDetails).filter(([_, details]) => details.endpoints && details.endpoints.length > 0);

  serviceNodes.forEach(([nodeId, details]) => {
    const nodeObj = scenario.architectureNodes.find((n) => n.id === nodeId);
    const nodeTitle = nodeObj ? nodeObj.data.label : nodeId;

    checkPageBreak(32);

    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.roundedRect(margin, currentY, contentWidth, 7, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
    doc.text(nodeTitle.toUpperCase(), margin + 4, currentY + 4.8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(cyanAccent[0], cyanAccent[1], cyanAccent[2]);
    doc.text(details.technology, pageWidth - margin - 45, currentY + 4.8);
    currentY += 9;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const purpLines = doc.splitTextToSize(details.purpose, contentWidth - 4);
    doc.text(purpLines, margin + 2, currentY);
    currentY += purpLines.length * 3.8 + 2;

    if (details.endpoints && details.endpoints.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      doc.text('Key API Endpoints:', margin + 2, currentY);
      currentY += 3.5;

      details.endpoints.forEach((ep) => {
        checkPageBreak(6);
        doc.setFont('courier', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(30, 41, 59);
        doc.text(`• ${ep}`, margin + 5, currentY);
        currentY += 3.5;
      });
      currentY += 2;
    }

    currentY += 3;
  });

  // ==========================================
  // SECTION 5: SECURITY, SCALABILITY & COST
  // ==========================================
  checkPageBreak(45);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('5. SYSTEM SECURITY, SCALABILITY & COST INSIGHTS', margin, currentY);
  currentY += 4;

  doc.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
  doc.setLineWidth(0.8);
  doc.line(margin, currentY, margin + 45, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('Security Protocols & Isolation Safeguards:', margin, currentY);
  currentY += 4.5;

  scenario.securityInsights.forEach((sec) => {
    checkPageBreak(6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(`[OK] ${sec}`, margin + 4, currentY);
    currentY += 4;
  });

  currentY += 4;

  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('Scalability & Concurrency Protections:', margin, currentY);
  currentY += 4.5;

  scenario.scalabilityInsights.forEach((sca) => {
    checkPageBreak(6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(`[>>] ${sca}`, margin + 4, currentY);
    currentY += 4;
  });

  currentY += 6;

  // Technology Stack Table
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('Production Technology Stack Matrix:', margin, currentY);
  currentY += 4.5;

  const techEntries = Object.entries(scenario.technologyStack);
  const techColW = (contentWidth - 6) / 2;

  for (let i = 0; i < techEntries.length; i += 2) {
    checkPageBreak(10);
    const [tKey1, tVal1] = techEntries[i];
    const item2 = techEntries[i + 1];

    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, currentY, techColW, 8, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(tKey1, margin + 2, currentY + 5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.text(tVal1, margin + 35, currentY + 5);

    if (item2) {
      const [tKey2, tVal2] = item2;
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin + techColW + 6, currentY, techColW, 8, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
      doc.text(tKey2, margin + techColW + 8, currentY + 5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      doc.text(tVal2, margin + techColW + 42, currentY + 5);
    }
    currentY += 10;
  }

  // ==========================================
  // FOOTER ON ALL PAGES
  // ==========================================
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);

    doc.setDrawColor(borderSlate[0], borderSlate[1], borderSlate[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text('ArchiTech AI | Autonomous Architecture Synthesis System | Aavishkar 2026-27', margin, pageHeight - 7);
    doc.text(`Page ${p} of ${pageCount}`, pageWidth - margin - 18, pageHeight - 7);
  }

  // Trigger browser file download
  const cleanFilename = `ArchiTech-AI_${scenario.id}_Architecture_Blueprint.pdf`;
  doc.save(cleanFilename);
}
