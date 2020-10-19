import formatValue from './formatValue';

const calcArrayTotal = arr => {
  return formatValue(arr.reduce((sum, val) => (sum + parseFloat(val.total)), 0));
}

export default calcArrayTotal;
