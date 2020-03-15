// @flow strict
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import type { Edges } from '../../types';
import styles from './Feed.module.scss';

type Props = {
  edges: Edges
};

const Feed = ({ edges }: Props) => (
  <div className={styles['feed']}>
    {edges.map((edge) => (
      <div className={styles['feed__item']} key={edge.node.fields.slug}>
        <h2 className={styles['feed__item-title']}>
          <Link className={styles['feed__item-title-link']} to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link>
        </h2>
        <div className={styles['feed__item-meta']}>
          <time className={styles['feed__item-meta-time']} dateTime={moment(edge.node.frontmatter.date).format('MMMM D, YYYY')}>
            {moment(edge.node.frontmatter.date).format('MMM DD, YYYY')}
          </time>
          <span className={styles['feed__item-meta-divider']} />
          <span className={styles['feed__item-meta-category']}>
            {edge.node.fields.readingTime.text}
          </span>
        </div>
        <p className={styles['feed__item-description']}>{edge.node.frontmatter.description}</p>
      </div>
    ))}
  </div>
);

export default Feed;
