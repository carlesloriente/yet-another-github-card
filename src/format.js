/* eslint-disable no-restricted-properties */
function stringFormat(value) {
  if (!(value >= 1000)) return value;
  let newValue = value;
  const suffixes = ['', 'k', 'm', 'b', 't'];
  let suffixNum = 0;
  while (newValue >= 1000) {
    newValue /= 1000;
    suffixNum += 1;
  }

  newValue = newValue.toPrecision(2);

  newValue += suffixes[suffixNum];
  return newValue;
}

export default stringFormat;
