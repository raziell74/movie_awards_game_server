import {fromJS, Map} from 'immutable';

import {
    setNominees,
    setNomineeWinner,
    getNomineeWinner
} from '../actions/nominees';

describe('nominee logic', () => {
    test('setNominees adds nominees to the state', () => {
        const state = Map();
        const nominees = fromJS({
            'Lead Actor': {
                entries: ['Gary Oldman', 'Kate Beckinsale']
            },
            'Best Picture': {
                entries: ['Dunkirk', 'The Shape of Water']
            }
        });
        const nextState = setNominees(state, nominees);

        expect(nextState).toEqual(fromJS({
            nominees: {
                'Lead Actor': {
                    entries: ['Gary Oldman', 'Kate Beckinsale']
                },
                'Best Picture': {
                    entries: ['Dunkirk', 'The Shape of Water']
                }
            }
        }));
    });

    test('setNomineeWinner removes other nominees in categories with just winner', () => {
        const state = fromJS({
            nominees: {
                'Lead Actor': {
                entries: ['Gary Oldman', 'Kate Beckinsale']
                },
                'Best Picture': {
                    entries: ['Dunkirk', 'The Shape of Water']
                }
            }
        });
        const categoryState = state.get('nominees').get('Lead Actor');
        const nextState = setNomineeWinner(
            categoryState,
            'Kate Beckinsale'
        );

        expect(nextState).toEqual(fromJS({
            winner: 'Kate Beckinsale'
        }));
    });
    
    test('getNomineeWinner returns correct winner', () => {
        const state = fromJS({
            nominees: {
                'Lead Actor': {
                    winner: 'Kate Beckinsale'
                }
            }
        });
        const leadActorWinner = getNomineeWinner(state, 'Lead Actor');
        
        expect(leadActorWinner).toEqual('Kate Beckinsale');
    });
    
    test('getNomineeWinner returns default response if no winner', () => {
        const state = fromJS({
            nominees: {
                'Load Actor': {
                    entries: ['Gary Oldman', 'Kate Beckinsale']
                }
            }
        });
        const leadActorWinner = getNomineeWinner(state, 'Lead Actor');

        expect(leadActorWinner).toEqual(false);
    });
});