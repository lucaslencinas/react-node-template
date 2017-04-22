import { createAction } from 'redux-actions';
import { gameModeService } from 'services';
import actionTypes from './actionTypes';

const actions = {
  fetchGameModes: createAction(actionTypes.FETCH_GAME_MODES, gameModeService.getGameModes)
};

export default actions;
