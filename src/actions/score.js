import {Map} from 'immutable';

export function updatePlayerScores(state) {
    const nominees = state.get('nominees');
    const scoreState = state.get('votes').map(function(v, k){
        let tally = 0;
        v.get('nominees').map(function(choice, movie) {
            if(nominees.get(movie).get('winner') == choice) {
                tally = tally + 1;
            }
        });

        return tally;
    });

    return state.update('score', Map(),scores => scoreState);
}