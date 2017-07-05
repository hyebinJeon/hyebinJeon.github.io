(function() {
	
	// Microsoft Internet Explorer ; 9 버전 이전일 경우만 실행
	if ($.browser.msie && parseInt($.browser.version) < 9) {
		
		/** JS 파일 동적 로딩 */
		var loadJs = function(fileName) {
			var el = document.createElement('script');
			el.setAttribute('type', 'text/javascript');
			el.setAttribute('src', fileName);
			document.getElementsByTagName('head')[0].appendChild(el);
		};
		
		/** CSS 파일 동적 로딩 */
		var loadCss = function(fileName) {
			var el = document.createElement('link');
			el.setAttribute('rel', 'stylesheet');
			el.setAttribute("type", "text/css");
			el.setAttribute('href', fileName);
			document.getElementsByTagName('head')[0].appendChild(el);
		};
		
		/** HTML5 Markup을 사용 가능하게 합니다. */
		// html5shiv @rem remysharp.com/html5-enabling-script
		// iepp v1.6.2 @jon_neal iecss.com/print-protector
		// Dual licensed under the MIT or GPL Version 2 licenses
		/*@cc_on(function(a,b){function r(a){var b=-1;while(++b<f)a.createElement(e[b])}if(!(!window.attachEvent||!b.createStyleSheet||!function(){var a=document.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}())){a.iepp=a.iepp||{};var c=a.iepp,d=c.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",e=d.split("|"),f=e.length,g=new RegExp("(^|\\s)("+d+")","gi"),h=new RegExp("<(/*)("+d+")","gi"),i=/^\s*[\{\}]\s*$/,j=new RegExp("(^|[^\\n]*?\\s)("+d+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),k=b.createDocumentFragment(),l=b.documentElement,m=l.firstChild,n=b.createElement("body"),o=b.createElement("style"),p=/print|all/,q;c.getCSS=function(a,b){if(a+""===undefined)return"";var d=-1,e=a.length,f,g=[];while(++d<e){f=a[d];if(f.disabled)continue;b=f.media||b,p.test(b)&&g.push(c.getCSS(f.imports,b),f.cssText),b="all"}return g.join("")},c.parseCSS=function(a){var b=[],c;while((c=j.exec(a))!=null)b.push(((i.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(g,"$1.iepp_$2")+c[4]);return b.join("\n")},c.writeHTML=function(){var a=-1;q=q||b.body;while(++a<f){var c=b.getElementsByTagName(e[a]),d=c.length,g=-1;while(++g<d)c[g].className.indexOf("iepp_")<0&&(c[g].className+=" iepp_"+e[a])}k.appendChild(q),l.appendChild(n),n.className=q.className,n.id=q.id,n.innerHTML=q.innerHTML.replace(h,"<$1font")},c._beforePrint=function(){o.styleSheet.cssText=c.parseCSS(c.getCSS(b.styleSheets,"all")),c.writeHTML()},c.restoreHTML=function(){n.innerHTML="",l.removeChild(n),l.appendChild(q)},c._afterPrint=function(){c.restoreHTML(),o.styleSheet.cssText=""},r(b),r(k);if(c.disablePP)return;m.insertBefore(o,m.firstChild),o.media="print",o.className="iepp-printshim",a.attachEvent("onbeforeprint",c._beforePrint),a.attachEvent("onafterprint",c._afterPrint)}})(this,document);@*/
		
		/** HTML5 WebForm을 사용 가능하게 합니다. */
		loadJs('forie678-lib/webforms2/webforms2-p.js');
		
		$(document).ready(function() {
			
			/** CSS3 속성을 사용 가능하게 합니다. */
			$('body *').each(function() {
				$(this).css('behavior', 'url("forie678-lib/ie-css3/ie-css3.htc");');
			});
			
			/** upgrade MSIE5.5-8 to be compatible with modern browsers. */
			IE7_PNG_SUFFIX = '.png';
			loadJs('forie678-lib/ie7-js/IE9.js');
			
		});
		
	}
	
})();