export const getExpireTime = (expire_in: number) => {
  const now = new Date();
  const expire = new Date(expire_in * 1000 + now.getTime());
  return expire.toISOString();
};
