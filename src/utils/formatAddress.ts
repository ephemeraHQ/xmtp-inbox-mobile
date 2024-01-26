export const formatAddress = (address: string) => {
  if (!address) {
    return '';
  }
  return address.slice(0, 5) + '...' + address.slice(-4);
};
