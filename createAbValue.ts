const createAbValue = (id: string, {digit = 1, range = 1, pattern = 2} = {}) => {
  if (range < 1 || range > 2) throw new RangeError('桁範囲は1または2のみ指定可能です。');

  if (pattern < 2 || pattern > 10) throw new RangeError('テストパターンは2以上10以下の整数のみ指定可能です。');

  const startDigit = id.length - digit - range + 1;

  const _id = Number(id.substr(startDigit, range));

  const numberRange = range === 1 ? 10 : 10 ** range;

  if (_id >= numberRange - numberRange % pattern) return '';

  const abText = 'ABCDEFGHIJ';
  const abValue = abText[_id % pattern];

  return abValue;
}

export default createAbValue;
