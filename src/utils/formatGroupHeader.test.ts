import {formatGroupHeader} from './formatGroupHeader';

// Tests for formatGroupHeader
describe('formatGroupHeader', () => {
  it('should return the first address if there is only one', () => {
    const addresses = ['0x62BdD7864695d8B4c760CD1ea5635cD23A84d513'];
    const result = formatGroupHeader(addresses);
    expect(result).toBe(addresses[0]);
  });

  it('should return the number of members if there are more than one', () => {
    const addresses = [
      '0x62BdD7864695d8B4c760CD1ea5635cD23A84d513',
      '0x1f07ccCb84F550100a786EAFf7e7179C52b0aC8d',
    ];
    const result = formatGroupHeader(addresses);
    expect(result).toBe(`${addresses.length} members`);
  });
});
