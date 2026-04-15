export const escapeLikeString = (raw: string): string => {
  // Escapes \, %, and _ by prepending a backslash
  return raw.replace(/[\\%_]/g, '\\$&');
};
