import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '~/app/services/storage/storagePersist';

export const setTokenInSafeStorage = async (token: string) => {
  return await setStorageItem({ key: 'token', value: token, safe: true });
};

export const getTokenFromSafeStorage = async () => {
  const token = await getStorageItem({ key: 'token', safe: true });
  return token || '';
};

export const deleteTokenFromSafeStorage = async () => {
  await removeStorageItem({ key: 'token', safe: true });
};
