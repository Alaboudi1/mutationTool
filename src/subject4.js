export const mutants = [
  {
    code: `import java.util.Arrays;

import org.w3c.dom.css.Counter;

public class BiggestNumber {

    public static long findTheNextBiggerNumber(long n) {

        int ar[] = new int[20]; // long is 64 bit, so max 19 digits can be possible

        int length = 0, tmp;

        boolean found = false;
        while (n > 0) { //Origin: n != 0      //Note: This mutant did not cause any behavior or state change.
            ar[length++] = (int) (n % 10);   // Can you think of a test input that would trigger a behavior change for this mutant? 
                                            // All the test cases exercise findTheNextBiggerNumber method overed this mutant.
            n /= 10;                       // findTheNextBiggerNumber(1121); cause the n > 0 to be true for 4 times.
        }                                 // findTheNextBiggerNumber(1121); cause the n != 0 to be true 4 times.
        for (int i = 0, j = length - 1; i < length / 2; i++, j--) { 
            tmp = ar[i];

            ar[i] = ar[j];

            ar[j] = tmp;

        }
        for (int i = length - 1; i >= 0; i--) {

            for (int j = i; j >= 0; j--) {

                if (ar[j] < ar[i]) {

                    tmp = ar[i];

                    ar[i] = ar[j];

                    ar[j] = tmp;

                    Arrays.sort(ar, j + 1, length);

                    found = true;

                    break;

                }

            }

            if (found) {

                break;

            }

        }

        n = 0;

        for (int i = 0; i < length; i++) {

            n = n * 10 + ar[i];

        }

        return found ? n : -1;

    }

    public static void main(String[] args) {
        System.out.println(56278 == findTheNextBiggerNumber(52876));
        System.out.println(1211 == findTheNextBiggerNumber(1121));
        System.out.println(1234567918 == BiggestNumber.findTheNextBiggerNumber(1234567891));
        System.out.println(531 == BiggestNumber.findTheNextBiggerNumber(513));
        System.out.println(2071 == BiggestNumber.findTheNextBiggerNumber(2017));
        System.out.println(441 == BiggestNumber.findTheNextBiggerNumber(414));
        System.out.println(-1 == BiggestNumber.findTheNextBiggerNumber(531));

    }
  }`,
    mutant: {
      lineNumber: 14,
      column: { a: 18, b: 19 },
      type: "Orange",
      id: 0,
      subject: "subject_4",
      mutationOperation: "//Origin: n != 0"
    },
    infected: [],
    diffs: []
  }
];
export const javaCode = `import java.util.Arrays;

import org.w3c.dom.css.Counter;

public class BiggestNumber {

    public static long findTheNextBiggerNumber(long n) {

        int ar[] = new int[20]; // long is 64 bit, so max 19 digits can be possible

        int length = 0, tmp;

        boolean found = false;
        while (n != 0) {
            ar[length++] = (int) (n % 10);

            n /= 10;
        }
        for (int i = 0, j = length - 1; i < length / 2; i++, j--) { 
            tmp = ar[i];

            ar[i] = ar[j];

            ar[j] = tmp;

        }
        for (int i = length - 1; i >= 0; i--) {

            for (int j = i; j >= 0; j--) {

                if (ar[j] < ar[i]) {

                    tmp = ar[i];

                    ar[i] = ar[j];

                    ar[j] = tmp;

                    Arrays.sort(ar, j + 1, length);

                    found = true;

                    break;

                }

            }

            if (found) {

                break;

            }

        }

        n = 0;

        for (int i = 0; i < length; i++) {

            n = n * 10 + ar[i];

        }

        return found ? n : -1;

    }

    public static void main(String[] args) {
        System.out.println(56278 == findTheNextBiggerNumber(52876));
        System.out.println(1211 == findTheNextBiggerNumber(1121));
        System.out.println(1234567918 == BiggestNumber.findTheNextBiggerNumber(1234567891));
        System.out.println(531 == BiggestNumber.findTheNextBiggerNumber(513));
        System.out.println(2071 == BiggestNumber.findTheNextBiggerNumber(2017));
        System.out.println(441 == BiggestNumber.findTheNextBiggerNumber(414));
        System.out.println(-1 == BiggestNumber.findTheNextBiggerNumber(531));

        }
    }`;
