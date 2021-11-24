export default function declOfNum(n, words) {
	const n1 = n % 100;
	const n2 = n1 % 10;
	if (n1 >= 11 && n1 <= 20) return words[2];
	if (n2 === 1) return words[0];
	if (n2 >= 2 && n2 <= 4) return words[1];
	return words[2];
}
