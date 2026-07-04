// Builds real .docx files from the structured AI response.
// Kept separate from UI components so the document layout logic can be
// tested and reused independently of React.

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";

const FONT = "Calibri";

function contactLine(personal) {
  const parts = [personal.email, personal.phone, personal.address, personal.linkedin, personal.portfolio].filter(
    Boolean
  );
  return parts.join("  |  ");
}

function sectionHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 260, after: 100 },
    border: {
      bottom: { color: "2563EB", space: 2, style: BorderStyle.SINGLE, size: 6 },
    },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, color: "1E3A8A", font: FONT, size: 22 })],
  });
}

function bulletParagraph(text) {
  return new Paragraph({
    text,
    bullet: { level: 0 },
    spacing: { after: 60 },
    style: "bodyText",
  });
}

/**
 * Builds a Document object for the resume from AI output + personal info.
 */
export function buildResumeDocument(personal, aiData) {
  const children = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [new TextRun({ text: personal.fullName || "Your Name", bold: true, size: 36, font: FONT })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: contactLine(personal), size: 20, color: "475569", font: FONT })],
    }),
  ];

  if (aiData.summary) {
    children.push(sectionHeading("Professional Summary"));
    children.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: aiData.summary, size: 21, font: FONT })],
      })
    );
  }

  if (aiData.skills?.length) {
    children.push(sectionHeading("Skills"));
    children.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: aiData.skills.join("  •  "), size: 21, font: FONT })],
      })
    );
  }

  if (aiData.experience?.length) {
    children.push(sectionHeading("Experience"));
    aiData.experience.forEach((job) => {
      children.push(
        new Paragraph({
          spacing: { before: 100 },
          children: [
            new TextRun({ text: job.role, bold: true, size: 22, font: FONT }),
            new TextRun({ text: job.company ? `  —  ${job.company}` : "", size: 22, font: FONT }),
          ],
        })
      );
      if (job.dateRange || job.location) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: [job.dateRange, job.location].filter(Boolean).join("  |  "),
                italics: true,
                size: 19,
                color: "64748B",
                font: FONT,
              }),
            ],
          })
        );
      }
      (job.bullets || []).forEach((bullet) => children.push(bulletParagraph(bullet)));
    });
  }

  if (aiData.projects?.length) {
    children.push(sectionHeading("Projects"));
    aiData.projects.forEach((project) => {
      children.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [new TextRun({ text: project.name, bold: true, size: 22, font: FONT })],
        })
      );
      (project.bullets || []).forEach((bullet) => children.push(bulletParagraph(bullet)));
    });
  }

  if (aiData.education?.length) {
    children.push(sectionHeading("Education"));
    aiData.education.forEach((edu) => {
      children.push(
        new Paragraph({
          spacing: { before: 80 },
          children: [
            new TextRun({ text: edu.degree, bold: true, size: 22, font: FONT }),
            new TextRun({ text: edu.school ? `  —  ${edu.school}` : "", size: 22, font: FONT }),
          ],
        })
      );
      if (edu.dateRange || edu.honors) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: [edu.honors, edu.dateRange].filter(Boolean).join("  |  "),
                italics: true,
                size: 19,
                color: "64748B",
                font: FONT,
              }),
            ],
          })
        );
      }
    });
  }

 if (aiData.certifications?.length) {
  children.push(sectionHeading("Certifications"));
  aiData.certifications.forEach((cert) => {
    const line = [cert.name, cert.issuer].filter(Boolean).join(" — ");
    children.push(
      new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({ text: line, size: 21, font: FONT }),
          cert.date
            ? new TextRun({ text: `  (${cert.date})`, size: 19, italics: true, color: "64748B", font: FONT })
            : new TextRun({ text: "" }),
        ],
      })
    );
  });
}

  return new Document({
    sections: [{ properties: {}, children }],
  });
}

/**
 * Builds a Document object for the cover letter as a standard business letter.
 */
export function buildCoverLetterDocument(personal, coverLetterText, targetJob) {
  const paragraphs = coverLetterText
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const children = [
    new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: personal.fullName || "Your Name", bold: true, size: 26, font: FONT })],
    }),
    new Paragraph({
      spacing: { after: 300 },
      children: [new TextRun({ text: contactLine(personal), size: 20, color: "475569", font: FONT })],
    }),
    new Paragraph({
      spacing: { after: 260 },
      children: [
        new TextRun({
          text: new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }),
          size: 21,
          font: FONT,
        }),
      ],
    }),
  ];

  paragraphs.forEach((paragraph) => {
    children.push(
      new Paragraph({
        spacing: { after: 200 },
        alignment: AlignmentType.LEFT,
        children: [new TextRun({ text: paragraph, size: 22, font: FONT })],
      })
    );
  });

  children.push(
    new Paragraph({
      spacing: { before: 200 },
      children: [new TextRun({ text: "Sincerely,", size: 22, font: FONT })],
    }),
    new Paragraph({
      spacing: { before: 400 },
      children: [new TextRun({ text: personal.fullName || "Your Name", bold: true, size: 22, font: FONT })],
    })
  );

  return new Document({
    sections: [{ properties: {}, children }],
  });
}

async function downloadDocument(doc, filename) {
  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}

export async function downloadResumeDocx(personal, aiData) {
  const doc = buildResumeDocument(personal, aiData);
  await downloadDocument(doc, "Resume.docx");
}

export async function downloadCoverLetterDocx(personal, coverLetterText, targetJob) {
  const doc = buildCoverLetterDocument(personal, coverLetterText, targetJob);
  await downloadDocument(doc, "CoverLetter.docx");
}
