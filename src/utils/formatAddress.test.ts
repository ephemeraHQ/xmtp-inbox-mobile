import {formatAddress} from './formatAddress';

// Jest unit tests for formatAddress
describe('formatAddress', () => {
  it('should return the first 5 and last 4 characters of the address', () => {
    expect(formatAddress('0x1234567890123456789012345678901234567890')).toBe(
      '0x123...7890',
    );
  });
});
