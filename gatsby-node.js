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

  const pages = result.data.allMdx.nodes;

  pages.forEach(page => {
    console.log('page', page.frontmatter);
    actions.createPage({
      path: page.frontmatter.slug,
      component: require.resolve(`./${page.frontmatter.component}`),
      context: {
        slug: page.frontmatter.slug,
      },
    });
  });
};
