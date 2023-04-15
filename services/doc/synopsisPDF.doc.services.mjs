import path from 'path';
import { readFileSync } from 'fs';
import PdfPrinter from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts.js";

const __dirname = path.resolve()
var fonts = {
  Roboto: {
    italics: Buffer.from(readFileSync(__dirname + '/static/ArialItalic.ttf'), 'base64'),
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  },
}

const printer = new PdfPrinter({ vfs: pdfFonts.pdfMake.vfs, ...fonts })

function createSynopsis(projects) {
  const docDefinition = {
    permissions: {
      printing: "highResolution", //'lowResolution'
      modifying: false,
      copying: false,
      annotating: true,
      fillingForms: true,
      contentAccessibility: true,
      documentAssembly: true,
    },
    header: {
      italics: true,
      margin: [60, 20],
      columns: [
        {
          text: "Pune Institute of Computer Technology, Pune-43",
          alignment: "left",
          width: "50%",
        },
        {
          text: "Impetus Synopsis: InC 2023",
          alignment: "right",
          width: "50%",
        },
      ],
      lineHeight: 1.5,
      decoration: "underline",
      fontSize: 10,
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 1,
          x2: 495.28,
          y2: 2,
          lineWidth: 10,
          lineColor: "#aaa",
        },
      ],
    },
    footer: function (currentPage, pageCount) {
      return {
        text: currentPage.toString() + " of " + pageCount,
        margin: [20, 0, 0, 0], // top, right, bottom, left
        alignment: "center",
        italics: true,
      }
    },
    content: [
      {
        toc: {
          title: { text: "Contents", style: "header", alignment: "left", fontSize: 24, fontWeight: "bold", margin: [10, 10], marginBottom: 40 },
          textMargin: [5, 5, 5, 5],
          //textStyle: {italics: true},
          numberStyle: { bold: true },
          numberMargin: [10, 10, 10, 10],
          pagebreak: "after",


        },
      },

      {
        text: "Project Summaries",
        fontSize: 18,
        bold: true,
        marginBottom: 10,
        pageBreak: "before",

      },
      ...projects.map((project) => [
        {
          text: `${project.projectId} : ${project.projectTitle} `,
          fontSize: 14,
          bold: true,
          marginBottom: 8,
          tocItem: true,

        },
        //{ text: `Project ID:`, fontSize: 12 },
        { text: `Project Abstract: ${project.projectAbstract}`, fontSize: 12 },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 5,
              x2: 595 - 2 * 40,
              y2: 5,
              lineWidth: 0.5,
              lineColor: "#aaa",
            },
          ],
          margin: [0, 5, 0, 10],
        }, // horizontal line between projects
      ]),
    ],
    pageMargins: [60, 60],
    defaultStyle: {
      font: "Times",
    },
  };

  return printer.createPdfKitDocument(docDefinition);
}

export default createSynopsis;
