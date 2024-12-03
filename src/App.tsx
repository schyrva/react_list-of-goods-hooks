import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  Default = 'default',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [sortField, SetSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleSort = (sortType: SortType) => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === SortType.Alphabetical) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.Length) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    SetSortField(sortType);
  };

  const handleReverse = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    SetSortField(SortType.Default);
    setIsReversed(false);
  };

  const isResetButtonVisible = sortField !== SortType.Default || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabetical,
          })}
          onClick={() => handleSort(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>
        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
