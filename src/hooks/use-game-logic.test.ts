
import { scrambleWord, ScrambledLetter } from './use-game-logic';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock use-sound 
jest.mock('use-sound', () => {
  return () => [() => {}];
});

describe('scrambleWord', () => {
  it('should scramble the word so that order is different (most of the time)', () => {
    const word = 'test';
    // Run the scramble a few times to ensure that the order changes at least once.
    let different = false;
    for (let i = 0; i < 10; i++) {
      const scrambled: ScrambledLetter[] = scrambleWord(word);
      if (scrambled.map(l => l.letter).join('') !== word) {
        different = true;
        break;
      }
    }
    expect(different).toBe(true);
  });
});

