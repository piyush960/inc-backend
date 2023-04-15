import PdfPrinter from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts.js";



PdfPrinter.vfs = pdfFonts.pdfMake.vfs

var fonts = {
    Courier: {
        normal: 'Courier',
        bold: 'Courier-Bold',
        italics: 'Courier-Oblique',
        bolditalics: 'Courier-BoldOblique'
    },
    Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
    },
}

const printer = new PdfPrinter(fonts)

function createSynopsis(projects) {
    const docDefinition = {
        permissions: {
            printing: 'highResolution', //'lowResolution'
            modifying: false,
            copying: false,
            annotating: true,
            fillingForms: true,
            contentAccessibility: true,
            documentAssembly: true
        },
        content: [
            { text: 'Project Summaries', fontSize: 18, bold: true, marginBottom: 10 },
            ...projects.map(project => [
                { text: `Project Title: ${project.projectTitle}`, fontSize: 14, bold: true, marginBottom: 5 },
                { text: `Project ID: ${project.projectId}`, fontSize: 12 },
                { text: `Project Abstract: ${project.projectAbstract}`, fontSize: 12, marginBottom: 10 }
            ])
        ],
        defaultStyle: {
            font: 'Helvetica'
        },
    }

    return printer.createPdfKitDocument(docDefinition)
}

export default createSynopsis;