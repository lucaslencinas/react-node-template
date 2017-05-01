import React from 'react';
import PropTypes from 'prop-types';
import Game from './Game';
import CreateGame from './CreateGame';
import styles from './GamesList.css';

const GamesList = ({
  games,
  selectedGame,
  onSelectGame,
  onDeleteGame,
  onOpenCreateGameForm,
  isCreateGameFormOpen
}) => (
  <div className={styles.gamesList}>
    <h3 className={styles.gameListTitle}>Games</h3>
    {games.map((game) => (
      <Game
        game={game}
        key={game.name}
        isSelected={(selectedGame || {}).slug === game.slug}
        onSelectGame={onSelectGame}
        onDeleteGame={onDeleteGame}
      />
    ))}
    <CreateGame onOpenCreateGameForm={onOpenCreateGameForm} isCreateGameFormOpen={isCreateGameFormOpen} />
  </div>
);

GamesList.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object),
  selectedGame: PropTypes.object,
  onSelectGame: PropTypes.func,
  onDeleteGame: PropTypes.func,
  onOpenCreateGameForm: PropTypes.func,
  isCreateGameFormOpen: PropTypes.bool
};

export default GamesList;
