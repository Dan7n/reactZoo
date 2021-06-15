export const sessionStorageChecker = (objName: string): boolean => {
  const sessionStorageObject = sessionStorage.getItem(objName);
  return !!sessionStorageObject;
};
