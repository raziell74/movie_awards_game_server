import {Map} from 'immutable';

export function vote(voteState = Map(), player, category, entry) {
    return voteState.updateIn(
        [player, 'nominees', category],
        0,
        vote => entry);
}