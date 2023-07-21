export const formatMoney = (x: number | undefined) => {
    if (x === undefined) return 0;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}