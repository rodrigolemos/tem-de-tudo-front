const formatValue = (value) => Intl.NumberFormat([], { style: 'currency', currency: 'BRL' }).format(value);

export default formatValue;
