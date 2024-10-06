importScripts("https://unpkg.com/@babel/standalone/babel.min.js");

self.onmessage = (e) => {
  const { code } = e.data;
  try {
    if (code) {
      self.postMessage(code);
    }
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
