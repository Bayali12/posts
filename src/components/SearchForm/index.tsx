import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';

import { setSearchTerm } from '../../store/slices/postsSlice';

import styles from './styles.module.scss';

export const SearchForm = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useAppSelector((state) => state.postsState);

  const handleChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className={styles.searchForm}>
      <input
        className={styles.searchInput}
        value={searchTerm}
        type="text"
        placeholder="Поиск по названию статьи"
        onChange={(e) => handleChangeSearchTerm(e)}
      />
    </div>
  );
};
