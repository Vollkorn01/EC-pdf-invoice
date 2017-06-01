var pdf = require('pdfkit');
//var fs = require('fs');

var myDoc = new pdf;

myDoc.pipe(fs.createWriteStream('node.pdf'));

// some vector graphics
doc.save()
   .moveTo(0, 50)
   .lineTo(612, 50)
   .lineTo(612, 00)
    .lineTo(0, 00)
   .fill("#fc0000");

// and some justified text wrapped into columns
doc.text('EC Vertrag', 100, 300)
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

myDoc.end();