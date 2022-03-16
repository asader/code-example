import cacheData from 'memory-cache';

export async function fetchWithCache<T>(
  cacheKey: string,
  getFetch: () => Promise<T>,
): Promise<T> {
  const value = cacheData.get(cacheKey);
  const hours = 24;

  const setCacheData = (data: any) => {
    cacheData.put(`${cacheKey}LastUpdate`, Date.now());
    cacheData.put(cacheKey, data);
  };

  const updateInBackground = async () => {
    const lastUpdate = cacheData.get(`${cacheKey}LastUpdate`);
    const minutes = 5;
    if (Date.now() > lastUpdate + minutes * 60 * 1000) {
      setCacheData(await getFetch());
    }
  };

  if (value) {
    updateInBackground().catch((e) => {
      throw new Error(e);
    });
    return value;
  }

  setCacheData(await getFetch());
  return cacheData.get(cacheKey);
}
