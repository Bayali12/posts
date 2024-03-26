import { FC } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { Post as PostType } from '../../types';
import Like from '../../assets/like.svg?react';
import Dislike from '../../assets/dislike.svg?react';

import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleLike, toggleDislike } from '../../store/slices/postsSlice';
import classNames from 'classnames';

type PostProps = PostType & {
  isFull?: boolean;
};

export const Post: FC<PostProps> = ({ id, isFull = false, title, body, likes, dislikes }) => {
  const dispatch = useAppDispatch();
  const { dislikedPosts, likedPosts } = useAppSelector((state) => state.postsState);

  return (
    <div className={classnames(styles.post, { [styles.fullPost]: isFull })}>
      <img className={styles.image} src="https://placehold.co/600x400" alt="" />
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        {isFull && <p className={styles.description}>{body}</p>}

        <div className={styles.footer}>
          <div className={styles.actions}>
            <div className={styles.actionsItem}>
              <button
                className={classNames(styles.likeBtn, styles.actionBtn, {
                  [styles.active]: likedPosts.includes(id),
                })}
                onClick={() => dispatch(toggleLike(id))}>
                <Like className={styles.icon} />
              </button>
              <span className={styles.likesCount}>{likes}</span>
            </div>

            <div className={styles.actionsItem}>
              <button
                className={classNames(styles.dislikeBtn, styles.actionBtn, {
                  [styles.active]: dislikedPosts.includes(id),
                })}
                onClick={() => dispatch(toggleDislike(id))}>
                <Dislike className={styles.icon} />
              </button>
              <span className={styles.dislikesCount}>{dislikes}</span>
            </div>
          </div>
          <Link to={'post/' + id} className={styles.openBtn}>
            Читать далее
          </Link>
        </div>
      </div>
    </div>
  );
};
