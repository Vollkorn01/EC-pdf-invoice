// create a document and pipe to a blob
var doc = new PDFDocument();
var stream = doc.pipe(blobStream());
var invoiceNumber = "4";
var startup = "Alphabet Inc.";
var date = new Date();
var terms = 30;
var balance = 60;

// Invoice title
doc.fontSize(25)
   .text('INVOICE', 400, 80);
// invoice number
doc.fontSize(16)
    .text('#' + invoiceNumber, 483, 120);
// Contact
doc.fontSize(12)
    .text('Post office\nETH Entrepreneur Club\nc/o ETH Zürich'+
        '\nRämistrasse\n101 CH-8092 Zürich', 100, 180);
// startup
doc.fontSize(12)
    .text('Bill to: '+ startup, 100, 300);
// date
doc.fontSize(12)
    .text('Date: '+ date.getDate() +'.'+(date.getMonth()+1)+'.'+
        date.getFullYear(), 400, 180);
// terms
doc.fontSize(12)
    .text('Payment Terms: payable within '+ terms + ' days', 400, 210);
    
function addDays(date, terms) {
    var result = new Date(date);
    result.setDate(result.getDate() + terms);
    return result;
}

doc.fontSize(12)
    .text('Date: '+ addDays(date,terms).getDate() + '.' +
        (addDays(date,terms).getMonth()+1)+'.'+
        addDays(date,terms).getFullYear(), 400, 238);


   
// and some justified text wrapped into columns
doc.text('And here is some wrapped text...', 100, 500)
   .font('Times-Roman', 13)
   .moveDown()
   .text(lorem, {
     width: 412,
     align: 'justify',
     indent: 30,
     columns: 2,
     height: 300,
     ellipsis: true
   });
   
// end and display the document in the iframe to the right
doc.end();
stream.on('finish', function() {
  iframe.src = stream.toBlobURL('application/pdf');
});