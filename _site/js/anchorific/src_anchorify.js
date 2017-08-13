/*
	The MIT License (MIT)

	Copyright (c) <2013> <Ren Aysha>

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/
function defer(t){window.jQuery?t():setTimeout(function(){defer(t)},5)}"function"!=typeof Object.create&&(Object.create=function(t){function n(){}return n.prototype=t,new n}),defer(function(){!function(t,n,a,e){"use strict";var i={init:function(n,a){var e=this;e.elem=a,e.$elem=t(a),e.opt=t.extend({},this.opt,n),e.headers=e.$elem.find(e.opt.headers),e.previous=0,0!==e.headers.length&&(e.first=parseInt(e.headers.prop("nodeName").substring(1),null)),e.build()},opt:{navigation:".anchorific",headers:"h1, h2, h3, h4, h5, h6",speed:200,anchorClass:"anchor",anchorText:"#",top:".top",spy:!0,position:"append",spyOffset:!0},build:function(){var n,a=this,e=function(){};a.opt.navigation&&(t(a.opt.navigation).append("<ul />"),a.previous=t(a.opt.navigation).find("ul").last(),e=function(t){return a.navigations(t)});for(var i=0;i<a.headers.length;i++)n=a.headers.eq(i),e(n),a.anchor(n);a.opt.spy&&a.spy(),a.opt.top&&a.back()},navigations:function(n){var a,i,o,r=this,s=r.name(n);n.attr("id")!==e&&(s=n.attr("id")),a=t("<a />").attr("href","#"+s).text(n.text()),i=t("<li />").append(a),o=parseInt(n.prop("nodeName").substring(1),null),i.attr("data-tag",o),r.subheadings(o,i),r.first=o},subheadings:function(n,a){var e=this,i=(t(e.opt.navigation).find("ul"),t(e.opt.navigation).find("li"));n===e.first?e.previous.append(a):n>e.first?(i.last().append("<ul />"),t(e.opt.navigation).find("ul").last().append(a),e.previous=a.parent()):(t("li[data-tag="+n+"]").last().parent().append(a),e.previous=a.parent())},name:function(t){return t.text().replace(/[^\w\s]/gi,"").replace(/\s+/g,"-").toLowerCase()},anchor:function(t){var n,a=this,i=a.name(t);a.opt.anchorText,a.opt.anchorClass;t.attr("id")===e&&t.attr("id",i),n=t.attr("id"),t.html('<a class="anchor" href=#'+n+">"+t.html()+"</a>")},back:function(){var n=this,a=t("body, html");t(n.opt.top).on("click",function(t){t.preventDefault(),a.animate({scrollTop:0},n.opt.speed)})},top:function(n){var a=this,e=a.opt.top;!1!==e&&(t(n).scrollTop()>200?t(e).fadeIn():t(e).fadeOut())},spy:function(){var a,i,o,r=this;t(n).scroll(function(){r.top(this),a=r.headers.map(function(){if(t(this).offset().top-t(n).scrollTop()<r.opt.spyOffset)return this}),(a=t(a).eq(a.length-1))&&a.length&&(i=t('li:has(a[href="#'+a.attr("id")+'"])'),o!==e&&o.removeClass("active"),i.addClass("active"),o=i)})}};t.fn.anchorific=function(n){return this.each(function(){if(!t.data(this,"anchorific")){var a=Object.create(i);a.init(n,this),t.data(this,"anchorific",a)}})}}(jQuery,window,document)});