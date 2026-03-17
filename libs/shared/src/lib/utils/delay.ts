const delay = (time = 0) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(0);
    }, time);
  });

export default delay;
