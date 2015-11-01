

function parseText(context, text, x, y, maxWidth, lineHeight) {
  if ( text.match(/\/n/) ) return parseText();
  else return wrapText();
}

// for text string with NO line breaks
function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

// for text string containing line breaks
function parseText(context, text, x, y, maxWidth, lineHeight) {
  
}


var canvas = document.getElementById('myCanvas'),
  context = canvas.getContext('2d'),
  centerX = canvas.width / 2,
  centerY = canvas.height - 30,
  angle = Math.PI * 0.8,
  radius = 150;

context.font = '30pt Calibri';
context.textAlign = 'center';
context.fillStyle = 'blue';
context.strokeStyle = 'blue';
context.lineWidth = 4;
drawTextAlongArc(context, 'Text along arc path', centerX, centerY, radius, angle);

// draw circle underneath text
context.arc(centerX, centerY, radius - 10, 0, 2 * Math.PI, false);
context.stroke();