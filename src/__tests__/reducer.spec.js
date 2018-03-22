import {Map, fromJS} from 'immutable';

import reducer from '../reducer.js';

describe('reducer', () => {
    test('can be used with reduce', () => {
        const nomineeMap = fromJS({
            'Lead Actor': {entries: ['Gary Oldman', 'Kate Beckinsale']},
            'Best Picture': {entries: ['Dunkirk', 'The Shape of Water']}
        });
        const actions = [
            {type: 'SET_NOMINEES', nominees: nomineeMap},
            {
                type: 'VOTE',
                player: 'Jordan',
                category: 'Lead Actor',
                entry: 'Kate Beckinsale'
            },
            {
                type: 'VOTE',
                player: 'Tarrah',
                category: 'Lead Actor',
                entry: 'Gary Oldman'
            },
            {
                type: 'VOTE',
                player: 'Jordan',
                category: 'Best Picture',
                entry: 'The Shape of Water'
            },
            {
                type: 'VOTE',
                player: 'Tarrah',
                category: 'Best Picture',
                entry: 'Dunkirk'
            },
            {
                type: 'SET_NOMINEE_WINNER',
                category: 'Lead Actor',
                entry: 'Kate Beckinsale'
            },
            {type: 'UPDATE_SCORES'}
        ];
        const finalState = actions.reduce(reducer, Map());
        
        expect(finalState).toEqual(fromJS({
            nominees: {
                'Lead Actor': {
                    winner: 'Kate Beckinsale'
                },
                'Best Picture': {
                    entries: ['Dunkirk', 'The Shape of Water']
                }
            },
            votes: {
                'Jordan': {
                    nominees: {
                        'Lead Actor': 'Kate Beckinsale',
                        'Best Picture': 'The Shape of Water'
                    }
                },
                'Tarrah': {
                    nominees: {
                        'Lead Actor': 'Gary Oldman',
                        'Best Picture': 'Dunkirk'
                    }
                }
            },
            score: {
                'Jordan': 1,
                'Tarrah': 0
            }
        }));
    });
});