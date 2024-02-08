export const formatGroupHeader = (addresses: string[]) => {
  if (addresses.length === 1) {
    return addresses[0];
  }
  return `${addresses.length} members`;
};
