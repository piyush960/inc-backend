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

function createSynopsis() {
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
            { text: 'Hello World', fontSize: 18 },
            { text: 'This is a PDF generated using pdfmake', fontSize: 12 },
        ],
        defaultStyle: {
            font: 'Helvetica'
        },
    }

    return printer.createPdfKitDocument(docDefinition)
}

export default createSynopsis;