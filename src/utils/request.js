import fetch from 'dva/fetch';
/**
 * 检查response的body是否是json数据（根据content-type判断）
 * @param {Response} response 
 */
async function getJsonResponseOrError(response) {
    console.log(response);
    try {
        const data = await response.json();
        return data;
    } catch(e) {
        throw {"message": "服务端返回了非json数据，可能是服务器发生了异常。"}
    }
}
/**
 * 检查response是否含有body ,不含有body的代码有204等
 * @param {Response} response Response
 */
function isNoContentResponse(response) {
    console.log(response.status);
    return response.status == 204;
}
/**
 * 检查response的status code，对于非2xx请求返回一个异常 
 * @param {int} status HTTP 返回代码
 * @param {object} data json对象
 */
function checkStatus(status, data) {
  if (status >= 200 && status < 300) {
    return true;
  }
  if (status >=400 && status < 500) {
    throw {"message": data.message }
  }
  if (status >= 500) {
    throw {"message": data.message }
  }

}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const response = await fetch(url, options);
  if (isNoContentResponse(response)) {
    return {};
  }
  const data = await getJsonResponseOrError(response);  
  checkStatus(response.status, data);

  const ret = {
    ...data
  };

//   if (response.headers.get('x-total-count')) {
//     ret.headers['x-total-count'] = response.headers.get('x-total-count');
//   }

  return ret;
}