import {fromJS, Map} from 'immutable';

import {vote} from '../actions/player';

describe('vote logic', () => {
    test('vote creates player branch state', () => {
        const state = Map();
        const player = "Jordan";
        const category = "Lead Actor";
        const entry = "Kate Beckinsale";
        const nextState = vote(state.get('votes'), player, category, entry);

        expect(nextState).toEqual(fromJS({
            'Jordan': {
                'nominees': {
                    'Lead Actor': 'Kate Beckinsale'
                }
            }
        }));
    });

    test('vote retains previously voted on entries', () => {
        const voteState = fromJS({
            'Jordan': {
                'nominees': {
                    'Lead Actor': 'Kate Beckinsale'
                }
            }
        });
        const nextState = vote(
            voteState,
            'Jordan',
            'Best Picture',
            'The Shape of Water');

        expect(nextState).toEqual(fromJS({
            'Jordan': {
                'nominees': {
                    'Lead Actor': 'Kate Beckinsale',
                    'Best Picture': 'The Shape of Water'
                }
            }
        }));
    });

    test('vote updates if player changes vote', () => {
        const voteState = fromJS({
            'Jordan': {
                'nominees': {
                    'Lead Actor': 'Kate Beckinsale'
                }
            }
        });
        const nextState = vote(
            voteState,
            'Jordan',
            'Lead Actor',
            'Gary Oldman');

        expect(nextState).toEqual(fromJS({
            'Jordan': {
                'nominees': {
                    'Lead Actor': 'Gary Oldman'
                }
            }
        }));
    });
});