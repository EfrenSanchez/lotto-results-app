export function getURL(path) {
  return `${
    process.env.API_URL || "https://lottoland.com/api"
  }${path}`;
}

export async function fetchAPI(path) {
  const requestUrl = getURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

export async function getLastDrawing(lotteryId) {
  const requestUrl = `/drawings/${lotteryId}`;
  let response = await fetchAPI(requestUrl);
  
  if(Array.isArray(response)) [ response ] = response;

  const { last } = response
  return last;
}

export async function getDrawingByDate(lotteryId, date) {
  const requestUrl = `/drawings/${lotteryId}/${date}`;
  let response = await fetchAPI(requestUrl);

  if(Array.isArray(response)) [ response ] = response;
  
  const { last } = response;
  return last;
}
