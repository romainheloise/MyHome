const recoverBody = (scrollPo) => {
  document.body.style.position = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.margin = "";
  window.scrollTo(0, scrollPo);
};

export default recoverBody;
