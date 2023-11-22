import { F } from './functional.js';

describe('Functional', () => {
    test('should execute pipe with primitive state', () => {
        expect(F.pipe('a', [
            s => s + 'b',
            s => s + 'c'
        ])).toBe('abc');
    });

    test('should execute pipe with object state', () => {
        expect(F.pipe({ str: 'a' }, [
            ({ str }) => ({ str: str + 'b' }),
            ({ str }) => ({ str: str + 'c' })
        ])).toStrictEqual({ str: 'abc' });
    });

    test('should execute nested pipes', () => {
        expect(F.pipe({ state: { str: 'a' } }, [
            ({ state }) => ({
                state: F.pipe(state, [
                    ({ str }) => ({ str: str + 'b' }),
                    ({ str }) => ({ str: str + 'c' })
                ])
            })
        ])).toStrictEqual({
            state: { str: 'abc' }
        });
    });
});