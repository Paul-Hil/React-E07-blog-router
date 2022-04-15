import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const Post = ({category, title, excerpt, isZenMode}) => {
  const cssClass = classNames('post', {
    'post-zen': isZenMode
  });

  return (
    <article className={cssClass}>
      <h2 className="post-title">{title}</h2>
      <div className="post-category">{category}</div>
      <p className="post-excerpt">{excerpt}</p>
    </article>
  );
}

Post.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  isZenMode: PropTypes.bool.isRequired
}

export default Post;
