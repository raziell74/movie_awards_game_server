import {setNominees, setNomineeWinner} from './actions/nominees';
import {vote} from './actions/player';
import {updatePlayerScores} from './actions/score';
import {Map} from 'immutable';

export default function reducer(state = Map(), action) {
    switch(action.type) {
        case 'SET_NOMINEES':
            return setNominees(state, action.nominees);
        case 'SET_NOMINEE_WINNER':
            return state.updateIn(
                ['nominees', action.category],
                categoryState => setNomineeWinner(
                    state.get('nominees').get(action.category),
                    action.entry)
            );
        case 'VOTE':
            return state.update(
                'votes',
                votesState => vote(state.get('votes'),
                                   action.player,
                                   action.category,
                                   action.entry)
            );
        case 'UPDATE_SCORES':
            return updatePlayerScores(state);
    }

    return state;
}