function svgNode(T, container) {
	this.$el = $('<div style="border:1px solid red; margin-bottom:5px;"/>').appendTo($('#drawing'));
	this.el = this.$el.get(0);
	this.container = container;
	$.extend(this, {
		text : '',
		font : {
			family:   'Comic sans'
			, size:     30
			, anchor:   'left'
			, leading:  '1em'
		},
		color : "#555555",
		align : 'left',
		lineHeight : 1.2,
		height : 0,
	});

	this.set(T);
}
svgNode.prototype.set = function(params) {
	$.extend(this, params);
	this.update();
};
svgNode.prototype.update = function() {
	this.$el.empty();
	var WIDTH = this.container.w
		, draw = SVG(this.el).size(WIDTH, this.container.Canvas.height)
		, text = draw.text(this.text).font(this.font)
		, midpoint = Math.round(WIDTH/2)
		;
	if ( this.align==='middle') text.x(midpoint);

	if ( this.path ) {
		var x1 = 0
			, y1 = Math.round(.25*WIDTH)
			, w = WIDTH
			, stretch = Math.round(w*.10)*-1  // e.g. -50
			;
		var path = [
					'M', x1, y1,
					'C', x1, stretch, w, stretch, w, y1
					].join(" ");
		text.path(path);
		text.textPath().attr('startOffset', .1)
		text.textPath().attr("letter-spacing",".25em");
		this.height = text.track().height()+stretch;
	}
	else this.height = text.lines().members.length*Math.round(this.font.size*this.lineHeight);
	this.btoa = 'data:image/svg+xml;base64,'+window.btoa(this.$el.find('svg').get(0).outerHTML);
}
svgNode.prototype.draw = function() {
	var self = this
		, ctx = this.container.Canvas.ctx
		;
	$('<img/>')
	.on('load', function() {
		ctx.drawImage(this,20,self.y);			 
	})
	.attr('src',this.btoa);
}
