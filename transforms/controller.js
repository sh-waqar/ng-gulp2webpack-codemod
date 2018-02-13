export default function controller(file, api) {
  const j = api.jscodeshift;
  const injectLine = j.block(' @ngInject ');

  let result = j(file.source)
    .find(j.FunctionDeclaration)
    .at(0)
    .forEach(path => {
      const comment = path.node.comments;
      if (comment) comment.pop();
    })
    .nodes();

  var ex = j.exportDefaultDeclaration(result[0]);
  ex.comments = [injectLine];

  return j(ex).toSource();
}
