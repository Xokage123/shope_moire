export const getOnlyPositiveNumber = (value: number): number => {
  if (isNaN(+value) || value < 1) return 1;
  return value;
};
