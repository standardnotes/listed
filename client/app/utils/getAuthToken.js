export default () => document.querySelector("meta[name='csrf-token']").getAttribute("content");
