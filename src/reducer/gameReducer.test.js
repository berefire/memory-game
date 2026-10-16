import { describe, it, expect } from 'vitest';
import { gameReducer } from './gameReducer';
import { initialState } from './initialState';
import { ACTIONS } from './actions';

function makeCard(id, value, overrides = {}) {
  return { id, value, isFlipped: false, isMatched: false, ...overrides };
}

describe('gameReducer', () => {
  describe('FLIP_CARD', () => {
    it('flips a hidden card and adds it to flippedCardIds', () => {
      const state = { ...initialState, cards: [makeCard(0, 'sun'), makeCard(1, 'moon')] };
      const next = gameReducer(state, { type: ACTIONS.FLIP_CARD, payload: { cardId: 0 } });
      expect(next.cards[0].isFlipped).toBe(true);
      expect(next.flippedCardIds).toEqual([0]);
    });

    it('does nothing when the card is already flipped', () => {
      const state = { ...initialState, cards: [makeCard(0, 'sun', { isFlipped: true })], flippedCardIds: [0] };
      const next = gameReducer(state, { type: ACTIONS.FLIP_CARD, payload: { cardId: 0 } });
      expect(next).toBe(state);
    });

    it('does nothing when two cards are already flipped', () => {
      const state = {
        ...initialState,
        cards: [makeCard(0, 'sun'), makeCard(1, 'moon'), makeCard(2, 'star')],
        flippedCardIds: [0, 1],
      };
      const next = gameReducer(state, { type: ACTIONS.FLIP_CARD, payload: { cardId: 2 } });
      expect(next).toBe(state);
    });
  });

  describe('CHECK_MATCH', () => {
    it('marks both cards matched and scores the active player on a match', () => {
      const state = {
        ...initialState,
        cards: [makeCard(0, 'sun', { isFlipped: true }), makeCard(1, 'sun', { isFlipped: true })],
        flippedCardIds: [0, 1],
        players: [{ id: 0, score: 0 }],
      };
      const next = gameReducer(state, { type: ACTIONS.CHECK_MATCH });
      expect(next.cards[0].isMatched).toBe(true);
      expect(next.players[0].score).toBe(1);
      expect(next.moves).toBe(1);
    });

    it('flips both back down and advances to the next player on a mismatch', () => {
      const state = {
        ...initialState,
        cards: [makeCard(0, 'sun', { isFlipped: true }), makeCard(1, 'moon', { isFlipped: true })],
        flippedCardIds: [0, 1],
        players: [{ id: 0, score: 0 }, { id: 1, score: 0 }],
        activePlayerIndex: 0,
      };
      const next = gameReducer(state, { type: ACTIONS.CHECK_MATCH });
      expect(next.cards[0].isFlipped).toBe(false);
      expect(next.activePlayerIndex).toBe(1);
    });

    it('sets status to gameOver once every card is matched', () => {
      const state = {
        ...initialState,
        cards: [makeCard(0, 'sun', { isFlipped: true }), makeCard(1, 'sun', { isFlipped: true })],
        flippedCardIds: [0, 1],
        players: [{ id: 0, score: 0 }],
      };
      const next = gameReducer(state, { type: ACTIONS.CHECK_MATCH });
      expect(next.status).toBe('gameOver');
    });
  });

  describe('TICK', () => {
    it('does nothing when status is not playing', () => {
      const state = { ...initialState, status: 'gameOver', time: 5 };
      expect(gameReducer(state, { type: ACTIONS.TICK })).toBe(state);
    });
  });

  describe('RETURN_TO_SETUP', () => {
    it('resets to initialState but keeps the current settings', () => {
      const state = {
        ...initialState,
        status: 'gameOver',
        settings: { theme: 'icons', playerCount: 2, gridSize: 6 },
        cards: [makeCard(0, 'sun', { isMatched: true })],
      };
      const next = gameReducer(state, { type: ACTIONS.RETURN_TO_SETUP });
      expect(next.status).toBe('setup');
      expect(next.settings).toEqual({ theme: 'icons', playerCount: 2, gridSize: 6 });
      expect(next.cards).toEqual([]);
    });
  });
});