const apiHostUrl = "https://api.exchangeratesapi.io"

const getRequestUrl = (reqPath) => {
  console.log(apiHostUrl)
  if ( apiHostUrl == null ) {
    return `${reqPath}`;
  } else {
    return `${apiHostUrl}/${reqPath}`;
  }
};

export const isSuccessResponse = status => {
  return status >= 200 && status < 300;
};

export const get = (reqPath) => {
  return fetch(getRequestUrl(reqPath), {
    method: "GET",
  }).then((rawResponse) => {
    if ( isSuccessResponse(rawResponse.status) ) {
      return rawResponse.json()
      .then((parsedResponse) => {
         return new Promise((resolve, reject) => {
           resolve(parsedResponse);
         });
      })
    } else {
      throw new Error()
    }
  })
}
