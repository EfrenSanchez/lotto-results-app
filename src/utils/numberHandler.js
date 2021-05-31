export function atLeastTwoFigures(num = 0) {
  const strNum = Math.floor(num).toString();

  return strNum.length <= 1 ? `0${strNum}` : strNum;
}

export function romanize(num = 1) {
	const numerals = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
	let result = "",
		tmpNum = num;
		
	Object.keys(numerals).forEach((key) => {
		result += key.repeat(tmpNum / numerals[key] >>> 0);
		tmpNum %= numerals[key];
	});

	return result;
}
