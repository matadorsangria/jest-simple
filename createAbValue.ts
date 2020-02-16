const createAbValue = (obj: {
  id: string
  digit?: number
  range?: number
  pattern?: number
}) => {
  if (obj.id === '') throw new Error('会員番号が空です。');

  const { digit = 1, range = 1, pattern = 2 } = obj;

  if (digit >= 6) throw new RangeError('桁目が6以上になると会員が実在する可能性があり危険です。');

  if (range < 1 || range > 2) throw new RangeError('桁範囲は1または2のみ指定可能です。');

  if (pattern < 2 || pattern > 10) throw new RangeError('テストパターンは2以上10以下の整数のみ指定可能です。');

  const startDigit = obj.id.length - digit - range + 1;

  if (startDigit < 0) throw new RangeError('桁範囲が不正です。');

  const _id = Number(obj.id.substr(startDigit, range));

  if (isNaN(_id)) throw new TypeError('会員番号の形式が不正です。');

  const numberRange = range === 1 ? 10 : 10 ** range;

  if (_id >= numberRange - numberRange % pattern) return '';

  const abText = 'ABCDEFGHIJ';
  const abValue = abText[_id % pattern];

  return abValue;
}

export default createAbValue;
