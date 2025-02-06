// jest.setup.js
const ReactDOM = require('react-dom');
const { createRoot } = require('react-dom/client');

if (!ReactDOM.render) {
  ReactDOM.render = (node, container) => {
    const root = createRoot(container);
    root.render(node);
    // Save the root on the container for later unmounting
    container.__reactRoot__ = root;
  };
}

if (!ReactDOM.unmountComponentAtNode) {
  ReactDOM.unmountComponentAtNode = (container) => {
    if (container.__reactRoot__) {
      container.__reactRoot__.unmount();
      return true;
    }
    return false;
  };
}
