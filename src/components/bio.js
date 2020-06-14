/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            firstName
            summary
          }
          social {
            twitter
            github
            email
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 80,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <div>
        <h3
          style={{
            marginTop: 0,
            marginBottom: rhythm(1 / 3),
          }}
        >
          Heyo{" "}
          <span role="img" aria-label="Waving Hand">
            👋
          </span>{" "}
          I'm {author.firstName}.
        </h3>

        <p
          style={{
            marginBottom: 0,
            paddingRight: rhythm(1),
          }}
        >
          {author.summary}
        </p>

        <div>
          <a
            href={`https://twitter.com/${social.twitter}`}
            style={{ marginRight: rhythm(1 / 3), color: "inherit" }}
          >
            Twitter
          </a>
          <a
            href={`https://github.com/${social.github}`}
            style={{ marginRight: rhythm(1 / 3), color: "inherit" }}
          >
            Github
          </a>
          <a href={`mailto:${social.email}`} style={{ color: "inherit" }}>
            Email
          </a>
        </div>
      </div>
    </div>
  )
}

export default Bio
