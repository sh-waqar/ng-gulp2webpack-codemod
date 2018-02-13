export default function directive(file, api) {
  const j = api.jscodeshift;
  const injectLine = j.block(' @ngInject ');

  let result = j(file.source)
  	.find(j.FunctionDeclaration)
  	.nodes();
  let directive = j(result)
  	.at(0)
  	.forEach(path => {
      const comment = path.node.comments;
      if (comment) comment.pop();
    })
  	.nodes();
  let controller = j(result)
  	.at(1)
  	.forEach(path => {
      const comment = path.node.comments;
      if (comment) {
        comment.pop();
        comment.push(injectLine);
      } else {
        path.node.comments = [injectLine];
      }
    })
  	.nodes();

  j(directive)
  	.find(j.Property)
  	.forEach(path => {
      if (path.value.key.name === 'controller') {
        var controllerName = path.value.value.value;
       	if (controllerName) {
          var controllerFunc = j.identifier(controllerName);
          path.value.value = controllerFunc;
        }
      }
      if (path.value.key.name === 'templateUrl') {
        var templateUrl = path.value.value.value;

       	if (templateUrl) {
          var fileName = templateUrl.replace(/^.*[\\\/]/, './');
          var fileReq = j.callExpression(j.identifier('require'), [j.literal(fileName)]);
          path.value.key.name = 'template'
          path.value.value = fileReq;
        }
      }
    });

  let directiveExport = j.exportDefaultDeclaration(directive[0]);
  directiveExport.comments = [injectLine];

  let nodes = [
    directiveExport
  ];

  if (controller.length > 0) {
    nodes.push(controller[0]);
  }

  let prog = j.program(nodes)

  return j(prog).toSource();

}
