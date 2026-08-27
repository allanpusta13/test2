const DB_NAME = 'artisan-pos-offline';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains('offlineOrders')) {
        const store = db.createObjectStore('offlineOrders', { keyPath: 'id' });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('queued_at', 'queued_at', { unique: false });
      }

      if (!db.objectStoreNames.contains('menuCache')) {
        db.createObjectStore('menuCache', { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains('settingsCache')) {
        db.createObjectStore('settingsCache', { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export interface OfflineOrder {
  id: string;
  idempotency_key: string;
  order: any;
  status: 'queued' | 'syncing' | 'synced' | 'failed';
  queued_at: string;
  synced_at?: string;
  error?: string;
}

export async function queueOfflineOrder(order: any): Promise<OfflineOrder> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('offlineOrders', 'readwrite');
    const store = tx.objectStore('offlineOrders');

    const offlineOrder: OfflineOrder = {
      id: `offline-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      idempotency_key: order.idempotency_key || `idem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      order,
      status: 'queued',
      queued_at: new Date().toISOString(),
    };

    store.add(offlineOrder);
    tx.oncomplete = () => resolve(offlineOrder);
    tx.onerror = () => reject(tx.error);
  });
}

export async function getQueuedOrders(): Promise<OfflineOrder[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('offlineOrders', 'readonly');
    const store = tx.objectStore('offlineOrders');
    const index = store.index('status');
    const request = index.getAll('queued');

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function markOrderSynced(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('offlineOrders', 'readwrite');
    const store = tx.objectStore('offlineOrders');
    const getReq = store.get(id);

    getReq.onsuccess = () => {
      const order = getReq.result;
      if (order) {
        order.status = 'synced';
        order.synced_at = new Date().toISOString();
        store.put(order);
      }
    };

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function markOrderFailed(id: string, error: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('offlineOrders', 'readwrite');
    const store = tx.objectStore('offlineOrders');
    const getReq = store.get(id);

    getReq.onsuccess = () => {
      const order = getReq.result;
      if (order) {
        order.status = 'failed';
        order.error = error;
        store.put(order);
      }
    };

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function clearSyncedOrders(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('offlineOrders', 'readwrite');
    const store = tx.objectStore('offlineOrders');
    const index = store.index('status');
    const request = index.openCursor('synced');

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function cacheMenuData(items: any[]): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('menuCache', 'readwrite');
    const store = tx.objectStore('menuCache');

    items.forEach((item) => store.put(item));

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getCachedMenu(): Promise<any[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('menuCache', 'readonly');
    const store = tx.objectStore('menuCache');
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
