/* eslint-disable @typescript-eslint/no-explicit-any */
export const logoutAsync = (req: any) => {
  return new Promise((resolve, reject) => {
    // Original callback-based function
    req.logout((err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve('success');
      }
    });
  });
};
