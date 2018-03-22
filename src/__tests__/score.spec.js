import {fromJS, Map} from 'immutable';

import {updatePlayerScores} from '../actions/score';

describe('scoring logic', () => {
    test('updatePlayerScores correctly calcualtes player scores', () => {
        const state = fromJS({
            nominees: {
                'Lead Actor': {
                    winner: 'Kate Beckinsale'
                },
                'Best Picture': {
                    winner: 'Dunkirk'
                },
                'Cinematography': {
                    entries: [
                        'Blade Runner 2049',
                        'Dunkirk',
                        'The Shape of Water'
                    ]
                }
            },
            votes: {
                'Jordan': {
                    'nominees': {
                        'Lead Actor': 'Kate Beckinsale',
                        'Best Picture': 'The Shape of Water',
                        'Cinematography': 'The Shape of Water'
                    }
                },
                'Tarrah': {
                    'nominees': {
                        'Lead Actor': 'Kate Beckinsale',
                        'Best Picture': 'Dunkirk',
                        'Cinematography': 'The Shape of Water'
                    }
                }
            }
        });
        const nextState = updatePlayerScores(state);

        expect(nextState).toEqual(fromJS({
            nominees: {
                'Lead Actor': {
                    winner: 'Kate Beckinsale'
                },
                'Best Picture': {
                    winner: 'Dunkirk'
                },
                'Cinematography': {
                    entries: [
                        'Blade Runner 2049',
                        'Dunkirk',
                        'The Shape of Water'
                    ]
                }
            },
            votes: {
                'Jordan': {
                    'nominees': {
                        'Lead Actor': 'Kate Beckinsale',
                        'Best Picture': 'The Shape of Water',
                        'Cinematography': 'The Shape of Water'
                    }
                },
                'Tarrah': {
                    'nominees': {
                        'Lead Actor': 'Kate Beckinsale',
                        'Best Picture': 'Dunkirk',
                        'Cinematography': 'The Shape of Water'
                    }
                }
            },
            score: {
                'Jordan': 1,
                'Tarrah': 2
            }
        }));
    });
});