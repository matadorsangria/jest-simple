import createAbValue from "../createAbValue";

describe('createAbValue', (): void => {
  // 異常系
  test('桁範囲が0', (): void => {
    expect(() => {
      createAbValue('1234567', { range: 0 })
    }).toThrow(RangeError);
  });

  test('桁範囲が3', (): void => {
    expect(() => {
      createAbValue('1234567', { range: 3 })
    }).toThrow(RangeError);
  });

  test('テストパターンが1', (): void => {
    expect(() => {
      createAbValue('1234567', { pattern: 1 })
    }).toThrow(RangeError);
  });

  test('テストパターンが11', (): void => {
    expect(() => {
      createAbValue('1234567', { pattern: 11 })
    }).toThrow(RangeError);
  });

  // 正常系
  test('会員番号が1、下1桁目、ABテスト', (): void => {
    const result: string = createAbValue('1');
    expect(result).toEqual('B');
  });

  test('会員番号が1234567899、10桁、ABCDEFGHIJテスト', (): void => {
    const result: string = createAbValue('1234567899', { pattern: 10 });
    expect(result).toEqual('J');
  });

  test('会員番号が123456、下2〜3桁目、ABCテスト', (): void => {
    const result: string = createAbValue('123456', { digit: 2, range: 2, pattern: 3 });
    expect(result).toEqual('A');
  });

  test('会員番号が123466、下2〜3桁目、ABCテスト', (): void => {
    const result: string = createAbValue('123466', { digit: 2, range: 2, pattern: 3 });
    expect(result).toEqual('B');
  });

  test('会員番号が123476、下2〜3桁目、ABCテスト', (): void => {
    const result: string = createAbValue('123476', { digit: 2, range: 2, pattern: 3 });
    expect(result).toEqual('C');
  });

  test('会員番号が123996、下2〜3桁目（ABテスト非対象パターン）', (): void => {
    const result: string = createAbValue('123996', { digit: 2, range: 2, pattern: 3 });
    expect(result).toEqual('');
  });
});
