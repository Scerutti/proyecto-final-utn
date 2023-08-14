export const getFormatPrice = (amount: number) => {
    const formattedAmount = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        currencyDisplay: 'symbol',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);

    return formattedAmount;
}

export const getCorrectCondition = (cond: string) => {
    if(cond === "new") return "Nuevo";
    return "Usado"
  }