import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';


const printPdf = (pdfTable, fileName) => {

          // var { window } = new JSDOM("");
          const doc = new jsPDF();
          //get html
         // const pdfTable = document.getElementById('divToPrint');
          //html to pdf format
          console.log(pdfTable);

          var html = htmlToPdfmake(pdfTable,{tableAutoSize:true});
          const documentDefinition = { content: html };
          pdfMake.vfs = pdfFonts.pdfMake.vfs;
          // var win = window.open('', '_blank');
          pdfMake.createPdf(documentDefinition).print();
    }


export default printPdf;
