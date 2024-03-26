import { useEffect } from 'react';

import { Posts } from '../../components/Posts';
import { SearchForm } from '../../components/SearchForm';
import { Spinner } from '../../components/Spinner';
import { fetchPosts } from '../../store/slices/postsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useDebounce } from '../../hooks/useDebounce';

import styles from './styles.module.scss';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { posts, searchTerm, isLoading } = useAppSelector((state) => state.postsState);

  const debounceedSearchTerm = useDebounce(searchTerm, 1500);

  useEffect(() => {
    dispatch(fetchPosts(searchTerm));
  }, [debounceedSearchTerm]);

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Блог</h1>
      <p className={styles.description}>
        Здесь мы делимся интересными кейсами из наших проектов, пишем про IT, а также переводим зарубежные статьи
      </p>
      <SearchForm />
      {isLoading && <Spinner />}
      <Posts posts={posts} />
    </div>
  );
};
