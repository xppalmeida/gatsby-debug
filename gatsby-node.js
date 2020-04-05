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

  console.log('result', JSON.stringify(result, null, 2));
  const pages = result.data.allMdx.nodes;

  pages.forEach(page => {
    console.log('+++++++++++++++++++++++++++++++++ slug: ', page.frontmatter.slug);
    const config = {
      path: page.frontmatter.slug,
      component: require.resolve(`./${page.frontmatter.component}`),
      context: {
        slug: page.frontmatter.slug,
      },
    };
    console.log('config to create page', JSON.stringify(config, null, 2));
    actions.createPage(config);
  });
};
