// create a document and pipe to a blob
var doc = new PDFDocument();
var stream = doc.pipe(blobStream());
var date = new Date();

// billing details
var startup = "Alphabet Inc.";
var invoiceNumber = "4";
var terms = 30;
var balance = 60;
var noPeople = 2;
var daysPerWeek = 4;
var rate = 10;
var balance = Math.round(noPeople * daysPerWeek * 4.3 * rate);

// positioning
var tableHeight = 404;
var columnWidths = [90, 330, 380, 425, 480];

// invoice title
doc.fontSize(25)
   .text('INVOICE', 430, 80);
   
// invoice number
doc.fontSize(16)
    .text('#' + invoiceNumber, 510, 120);
    
// contact
doc.fontSize(12)
    .text('Post office\nETH Entrepreneur Club\nc/o ETH Zürich'+
        '\nRämistrasse\n101 CH-8092 Zürich', columnWidths[0]-10, 180);
        
// startup
doc.fontSize(12)
    .text('Bill to: '+ startup, columnWidths[0]-10, 300);
    
// date
doc.fontSize(12)
    .text('Date: '+ date.getDate() +'.'+(date.getMonth()+1)+'.'+
        date.getFullYear(), 400, 180);
        
// terms
doc.fontSize(12)
    .text('Payment Terms: '+ terms + ' days', 400, 209);
    
// Due Date   
function addDays(date, terms) {
    var result = new Date(date);
    result.setDate(result.getDate() + terms);
    return result;
}
doc.fontSize(12)
    .text('Due Date: '+ addDays(date,terms).getDate() + '.' +
        (addDays(date,terms).getMonth()+1)+'.'+
        addDays(date,terms).getFullYear(), 400, 238);
        
// Balance Due
doc.roundedRect(383,257, 170, 30, 2)
    .fillColor('#f2f2f2')
    .fill()
    .stroke();
doc.fontSize(12)
    .fillColor('black')
    .text('Balance Due: CHF '+ balance + '.00', 400, 267);


        
// Table rectangle
doc.roundedRect(columnWidths[0]-10, 400, 470, 15, 2)
    .fillColor('black')
    .fill()
    .stroke();
    
// Columns
doc.fontSize(10)
    .fillColor('white')
    .text('Item', columnWidths[0], tableHeight)
    .text('People', columnWidths[1], tableHeight)
    .text('Days', columnWidths[2], tableHeight)
    .text('Rate', columnWidths[3], tableHeight)
    .text('Amount', columnWidths[4], tableHeight);
    
//invoice
doc.fontSize(10)
    .fillColor('black')
    .text('RocketHub Rent', columnWidths[0], tableHeight+20)
    .text(noPeople, columnWidths[1], tableHeight+20)
    .text(daysPerWeek, columnWidths[2], tableHeight+20)
    .text('CHF ' + rate, columnWidths[3], tableHeight+20)
    .text('CHF ' + balance + '.00', columnWidths[4], tableHeight+20)
    
// end and display the do  cument in the iframe to the right
doc.end();
stream.on('finish', function() {
  iframe.src = stream.toBlobURL('application/pdf');
});