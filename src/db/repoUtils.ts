export const getOrderPrice = (items: any[]): number => {
  return items.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
};
