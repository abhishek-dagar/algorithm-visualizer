import Promise from "bluebird";
import axios from "axios";

axios.interceptors.response.use((response) => response.data);

const request = (url, process) => {
  const tokens = url.split("/");
  const baseURL = /^https?:\/\//i.test(url) ? "" : "/api";
  return (...args) => {
    const mappedURL =
      baseURL +
      tokens
        .map((token, i) => (token.startsWith(":") ? args.shift() : token))
        .join("/");
    return Promise.resolve(process(mappedURL, args));
  };
};

const GET = (URL) => {
  return request(URL, (mappedURL, args) => {
    const [params, cancelToken] = args;
    return axios.get(mappedURL, {
      params,
      cancelToken,
    });
  });
};

const POST = (URL) => {
  return request(URL, (mappedURL, args) => {
    const [body, params, cancelToken] = args;
    return axios.post(mappedURL, body, {
      params,
      cancelToken,
    });
  });
};

const AlgorithmApi = {
  getCategories: GET("/algorithms"),
  getAlgorithm: GET("/algorithms/:categoryKey/:algorithmKey"),
};

const DocsApi = {
  getDocsMenu: GET("/docs/menu"),
  getDocsdata: GET("/docs/:Topic/:subTopic"),
};

const TracerApi = {
  md: ({ code }) =>
    Promise.resolve([
      {
        key: "markdown",
        method: "MarkdownTracer",
        args: ["Markdown"],
      },
      {
        key: "markdown",
        method: "set",
        args: [code],
      },
      {
        key: null,
        method: "setRoot",
        args: ["markdown"],
      },
    ]),
  json: ({ code }) => new Promise((resolve) => resolve(JSON.parse(code))),
  js: ({ code }, params, cancelToken) =>
    new Promise((resolve, reject) => {
      // const worker = new Worker(
      //   new URL("http://localhost:4000/api/tracers/js")
      // );
      const worker = new Worker(new URL("https://geekspoint.herokuapp.com/api/tracers/js"));
      if (cancelToken) {
        cancelToken.promise.then((cancel) => {
          worker.terminate();
          reject(cancel);
        });
      }
      worker.onmessage = (e) => {
        worker.terminate();
        resolve(e.data);
      };
      worker.onerror = (error) => {
        worker.terminate();
        reject(error);
      };
      worker.postMessage(code);
    }),
  py: POST("/tracers/py"),
};

export { AlgorithmApi, TracerApi, DocsApi };
