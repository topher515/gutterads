(function gutter() {
    function jsDynaLoad(b,c){function f(h,d){d=d||function(){};var a=document.createElement("script");a.type="text/javascript";if(a.readyState)a.onreadystatechange=function(){if(a.readyState==="loaded"||a.readyState==="complete"){a.onreadystatechange=null;d()}};else a.onload=function(){d()};a.src=h;document.getElementsByTagName("head")[0].appendChild(a)}c=c||function(){};if(typeof b==="string")f(b,c);else if(b instanceof Array){var e=0,i=b.length,g=function(){if(e>=i){c();return false}f(b[e],g);e++}; g()}};
    var d = 'http://localhost/~cwilcox/gutterads/';
    jsDynaLoad(["http://code.jquery.com/jquery-1.7.2.min.js",d+"gutterize.js"]);
})();
window.DEBUG = true;
void(0);