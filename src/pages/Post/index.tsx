import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import Back from '../../assets/back.svg?react';
import Like from '../../assets/like.svg?react';
import Dislike from '../../assets/dislike.svg?react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchPostById, toggleLike, toggleDislike } from '../../store/slices/postsSlice';
import { Spinner } from '../../components/Spinner';

import styles from './styles.module.scss';

export const Post = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { currentPost, isLoading, likedPosts, dislikedPosts } = useAppSelector((state) => state.postsState);

  useEffect(() => {
    dispatch(fetchPostById(Number(id)));
  }, []);

  return (
    <div className={styles.post}>
      <header className={styles.header}>
        <Link to={'/'} className={styles.backBtn}>
          <Back />
          Вернуться к статьям
        </Link>
        {!isLoading && (
          <div className={styles.actions}>
            <div className={styles.actionsItem}>
              <button
                className={classNames(styles.likeBtn, styles.actionBtn, {
                  [styles.active]: currentPost && likedPosts.includes(currentPost.id),
                })}
                onClick={() => dispatch(toggleLike(currentPost!.id))}>
                <Like className={styles.icon} />
              </button>
              <span className={styles.likesCount}>{currentPost?.likes}</span>
            </div>

            <div className={styles.actionsItem}>
              <button
                className={classNames(styles.dislikeBtn, styles.actionBtn, {
                  [styles.active]: currentPost && dislikedPosts.includes(currentPost.id),
                })}
                onClick={() => dispatch(toggleDislike(currentPost!.id))}>
                <Dislike className={styles.icon} />
              </button>
              <span className={styles.dislikesCount}>{currentPost?.dislikes}</span>
            </div>
          </div>
        )}
      </header>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.body}>
          <h2 className={styles.title}>{currentPost?.title}</h2>
          <img className={styles.image} src="https://placehold.co/600x400" alt="post-img" />
          <p className={styles.text}>{currentPost?.body}</p>
        </div>
      )}
    </div>
  );
};
