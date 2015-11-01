function TextNode(T, Container) {
	// set with defaults
	$.extend(this, {
		text : '',
		font : {
			family:   'Arial sans'
			, size:     14
			, anchor:   'left'
			, leading:  '1em'
		},
		color : "#555555",
		align : 'left',
		lineHeight : 1.2,
		height : 0,
	});
	this.C = Container;
	this.set(T);
}
TextNode.prototype.set = function(params) {
	$.extend(this, params);
	this.update();
};
TextNode.prototype.update = function() {
	this.lines = this.parseText();
	if ( this.path ) this.height = lines[0].height;
	else this.height = this.lines.length*Math.round(this.font.size*this.lineHeight);
};
TextNode.prototype.draw = function() {
	var self = this
		, ctx = this.C.Canvas.ctx
		;
	if ( this.path ) return this.drawOnPath();

	ctx.save();
	ctx.fillStyle = this.color;
	ctx.font = this.font.size+'px '+this.font.family;
	ctx.textAlign = this.align==='middle' ? 'center' : 'left';
	//ctx.strokeStyle = 'blue';
	//ctx.lineWidth = 4;	
	var x = this.align = 'left' ? this.C.x : this.C.centerX
		, y = this.y // this.y is set by the TextContainer.setHeight method
		;
	this.lines.forEach(function(line) {
		y += Math.round(self.font.size*self.lineHeight);
		ctx.fillText(line, x, y);  
	});
	ctx.restore();
};
TextNode.prototype.drawOnPath = function() {
var ctx = this.C.Canvas.ctx
	, centerX = this.C.centerX
	, centerY = canvas.height - 30
	, angle = Math.PI * 0.8
	, radius = 150
	, str = this.text
	;

  var len = str.length, s;
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(-1 * angle / 2);
  ctx.rotate(-1 * (angle / len) / 2);
  for (var n = 0; n < len; n++) {
    ctx.rotate(angle / len);
    ctx.save();
    ctx.translate(0, -1 * radius);
    s = str[n];
    ctx.fillText(s, 0, 0);
    ctx.restore();
  }
  ctx.restore();
};
TextNode.prototype.parseText = function () {
	if ( this.path ) return [{text:this.text, height: 100}];
	else if ( this.text.match(/\\n/) ) return this.noWrapText();
	else return this.wrapText();
};
// for text string with NO line breaks
TextNode.prototype.wrapText = function () {
	var ctx = this.C.Canvas.ctx
		, words = this.text.split(' ')
		, line = ''
		, lines = []
		, lineHeight = Math.round(this.font.size*this.lineHeight)
		;

	ctx.save();
	ctx.font = this.font.size+'px '+this.font.family;
	for(var n = 0; n < words.length; n++) {
		var testLine = line + words[n] + ' ';
		var metrics = this.C.Canvas.ctx.measureText(testLine);
		var testWidth = metrics.width;
		if (testWidth > this.C.w && n > 0) {
			lines.push(line);
			line = words[n] + ' ';
		}
		else line = testLine;
	}
	ctx.restore();
	lines.push(line);
	return lines;
};
// for text string containing line breaks
TextNode.prototype.noWrapText =function () {
	var lines = [];
	return lines;
};