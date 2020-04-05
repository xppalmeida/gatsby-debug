function debug(...args) {
  args.forEach(arg => {
    console.log('+++++++++++++++++++++++++++++++++', '\n', JSON.stringify(arg, null, 2), '\n');
  });
}
exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
            component
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('failed to create pages', result.errors);
  }

  debug(JSON.stringify(result, null, 2));
  const pages = result.data.allMdx.nodes;

  pages.forEach(page => {
    debug('+++++++++++++++++++++++++++++++++', page.frontmatter.slug);
    actions.createPage({
      path: page.frontmatter.slug,
      component: require.resolve(`./${page.frontmatter.component}`),
      context: {
        slug: page.frontmatter.slug,
      },
    });
  });
};
