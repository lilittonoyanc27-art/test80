export function numberToSpanish(n: number): string {
  if (n === 0) return "cero";
  if (n === 1000) return "mil";

  const units = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
  const teens = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
  const tens = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  const hundreds = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

  let result = "";

  if (n >= 100) {
    if (n === 100) return "cien";
    result += hundreds[Math.floor(n / 100)] + " ";
    n %= 100;
  }

  if (n >= 20) {
    if (n >= 21 && n <= 29) {
      result += "veinti" + units[n % 10];
    } else {
      result += tens[Math.floor(n / 10)];
      if (n % 10 !== 0) result += " y " + units[n % 10];
    }
  } else if (n >= 10) {
    result += teens[n - 10];
  } else if (n > 0) {
    result += units[n];
  }

  return result.trim();
}

export interface NumberChallenge {
  num: number;
  word: string;
  options: number[];
}

export interface MathChallenge {
  problem: string; // "veinte mas diez"
  answer: number;
  answerWord: string;
  options: number[];
}

function generateOptions(correct: number, max: number = 1000): number[] {
  const opts = new Set<number>([correct]);
  while (opts.size < 3) {
    const offset = Math.floor(Math.random() * 20) - 10;
    const val = Math.max(1, Math.min(max, correct + offset));
    if (val !== correct) opts.add(val);
  }
  return Array.from(opts).sort(() => Math.random() - 0.5);
}

export const NUMBER_CHALLENGES: NumberChallenge[] = Array.from({ length: 30 }, () => {
  const num = Math.floor(Math.random() * 999) + 1;
  return {
    num,
    word: numberToSpanish(num),
    options: generateOptions(num)
  };
});

const ops = [
  { word: "más", symbol: "+", fn: (a: number, b: number) => a + b },
  { word: "menos", symbol: "-", fn: (a: number, b: number) => a - b },
  { word: "por", symbol: "*", fn: (a: number, b: number) => a * b },
  { word: "entre", symbol: "/", fn: (a: number, b: number) => Math.floor(a / b) }
];

export const MATH_CHALLENGES: MathChallenge[] = Array.from({ length: 15 }, () => {
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a, b;
  
  if (op.word === "entre") {
    b = Math.floor(Math.random() * 10) + 1;
    a = b * (Math.floor(Math.random() * 10) + 1);
  } else if (op.word === "por") {
    a = Math.floor(Math.random() * 12) + 1;
    b = Math.floor(Math.random() * 12) + 1;
  } else {
    a = Math.floor(Math.random() * 100) + 1;
    b = Math.floor(Math.random() * 100) + 1;
    if (op.word === "menos" && a < b) [a, b] = [b, a];
  }

  const result = op.fn(a, b);
  const problem = `${numberToSpanish(a)} ${op.word} ${numberToSpanish(b)}`;
  
  return {
    problem,
    answer: result,
    answerWord: numberToSpanish(result),
    options: generateOptions(result)
  };
});
