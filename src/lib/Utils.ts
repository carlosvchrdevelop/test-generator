export const pad = (num: number, size: number) => {
    let snum = num.toString();
    while (snum.length < size) snum = '0' + snum;
    return snum;
};
