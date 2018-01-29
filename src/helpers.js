/**
 * dig
 * @param {*} obj pass the object that hold the data
 * @param {*} target pass string to target: 'props.user[0].name'
 * @return return the target or null
 */
export const dig = function(obj, target) {
  const keys = target.split('.');
  let digged = obj;
  for (const key of keys) {
    const parts = key.split('[');
    const _key = parts[0];
    digged = digged[_key];
    if (typeof digged === 'undefined' || digged === null) {
      return digged;
    }
    if (parts[1]) {
      digged = digged[parts[1].replace(']', '')];
      if (typeof digged === 'undefined' || digged === null) {
        return undefined;
      }
    }
  }
  return digged;
};

export const GetPointerObject = (className, objectId) => ({
  __type: 'Pointer',
  className,
  objectId,
});
