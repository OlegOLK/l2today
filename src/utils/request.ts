import { closestIndexTo } from 'date-fns';

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response, body: string) {
    super(body);
    this.response = response;
  }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const cloned = response.clone();
  if (cloned.statusText.length !== 0) {
    throw new ResponseError(response, cloned.statusText);
  } else {
    const json = await cloned.json();
    throw new ResponseError(response, JSON.stringify(json.messages));
  }
  // try{
  //   const json = await cloned.json();
  //   const body = cloned.statusText.length !== 0 ? cloned.statusText : JSON.stringify(json.messages);
  //   const error = new ResponseError(response, body);
  //   throw error;
  // }catch(err){
  //   throw new ResponseError(response, cloned.statusText);
  // }
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(
  url: string,
  options?: RequestInit,
): Promise<{} | { err: ResponseError }> {
  const fetchResponse = await fetch(url, options);
  const response = await checkStatus(fetchResponse);
  return parseJSON(response);
}
