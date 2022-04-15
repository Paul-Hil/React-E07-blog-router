import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

import Post from 'src/components/Post';

import './styles.scss';

const Posts = ({posts, isZenMode}) => {

  const cssClass = classNames('posts', {
    'posts-zen': isZenMode
  });

  return (
  <main className={cssClass}>
    <h1 className="posts-title">Dev Of Thrones</h1>

    <div className="posts-list">

    {posts.map((post) => {
      return (
        <Post {...post} isZenMode={isZenMode} key={post.id}/> // Spred Operator, déverse toutes les données dans le composant
      )
    })}

    </div>
  </main>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  isZenMode: PropTypes.bool.isRequired
}

export default Posts;
