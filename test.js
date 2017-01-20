(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['index.html.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n\n  <title>Pair-a-Slacks Demo</title>\n</head>\n\n<body>\n    <div id='frame' style='position: relative; border: 1px solid gray; overflow: hidden; width: 1000px; height: 400px'></div>\n\n    <script type='text/javascript' src='build/bundles/index-"
    + container.escapeExpression(((helper = (helper = helpers.APP_VERSION || (depth0 != null ? depth0.APP_VERSION : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"APP_VERSION","hash":{},"data":data}) : helper)))
    + ".js' />\n</body>\n</html>\n";
},"useData":true});
})();