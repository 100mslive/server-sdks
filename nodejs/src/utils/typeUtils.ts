/**
 * Utility functions to parse the response and cast date strings
 * to proper `Date` objects
 */
export function castDateFields<T>(payload: Record<string, any>): T {
  let key: keyof typeof payload;
  for (key in payload) {
    // check if it ends with "_at" and is not null
    if (key.endsWith("_at") && payload[key]) {
      try {
        payload[key] = new Date(payload[key] as string);
      } catch (error) {
        payload[key] = null;
      }
    }
  }
  return payload as T;
}

/**
 * Utility functions to serializes the query params to construct
 * the query param string, with proper support for arrays.
 *
 *  **Without serializeQueryParams**:
 * - query params: `{ foo = [1,2,3] }`
 * - query param string: `?foo[]=1&foo[]=2&foo[]=3`
 *
 * **With serializeQueryParams**:
 * - query params: `{ foo = [1,2,3] }`
 * - query param string: `?foo=1&foo=2&foo=3`
 */
export function serializeQueryParams(params: any) {
  let options = "";
  if (!params) return options;

  const keys = Object.keys(params);

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === "object";
    const isParamTypeArray = isParamTypeObject && params[key].length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element: any) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
}
