import {Map} from 'immutable';

export function setNominees(state, nominees) {
    return state.set('nominees', nominees);
}

export function setNomineeWinner(categoryState, winner) {
    return categoryState.remove('entries')
                        .set('winner', winner);
}

export function getNomineeWinner(state, category) {
    return state.getIn(
        ['nominees', category, 'winner'],
        'Winner not announced yet.'
    );
}