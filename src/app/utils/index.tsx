export const truncateText = (text: string, maxLength: number) => {
  const words = text.split(" ");
  if (words.length > maxLength) {
    return words.slice(0, maxLength).join(" ") + "...";
  } else {
    return text;
  }
};
