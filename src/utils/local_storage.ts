class LocalStorageSaver {
  static getData<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);

      if (!data) return null;

      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  }

  static setData<T>(key: string, value: T, passStringify?: boolean) {
    localStorage.setItem(
      key,
      passStringify && typeof value === "string"
        ? value
        : JSON.stringify(value),
    );
  }

  static removeData(key: string) {
    localStorage.removeItem(key);
  }

  static clearAll() {
    localStorage.clear();
  }
}

export default LocalStorageSaver;
