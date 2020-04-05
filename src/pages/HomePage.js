import React from 'react';

import Footer from "../components/Footer";
import Header from '../components/Header';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import SEO from "../components/SEO";
import TeaserMovie from '../components/TeaserMovie';

const HomePage = ({ data: { mdx: { body, frontmatter }} }) => {
  return (
    <div>
      <SEO title={frontmatter.title} />
      <Header siteTitle={frontmatter.title} />
      <>
      <MDXRenderer>{body}</MDXRenderer>
      </>
      <Footer />
      <TeaserMovie />
    </div>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        slug
        title
      }
      body
    }
  }
`;
export default HomePage;
