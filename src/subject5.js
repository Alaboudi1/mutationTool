export const mutants = [
    {
      code: `import java.util.Arrays;
  
import org.w3c.dom.css.Counter;

public class BiggestNumber {

    public static long findTheNextBiggerNumber(long n) {

        int ar[] = new int[20]; // long is 64 bit, so max 19 digits can be possible

        int length = 0, tmp;

        boolean found = false;
        while (n > 0) { 
            ar[length++] = (int) (n % 10);

            n /= 10;

        }
        for (int i = 0, j = length - 1; i < length / 2; i++, j--) { 
            tmp = ar[i];

            ar[i] = ar[j];

            ar[j] = tmp;

        }
        for (int i = length - 1; i >= 0; i--) {

            for (int j = i; j >  0; j--) { //Origin: j >= 0                     //Note: This mutant caused behavior change but no state change!
                                                                               // It seems that the mutant missed some coverage that the actual program has. Hover over lines 31-46 to see the missed hits.
                if (ar[j] < ar[i]) {                                          // Here is a list of test cases that cause the change in the behavior but not in the state for that mutant.
                                                                             //    * BiggestNumber.findTheNextBiggerNumber(1121) -> missed 1 hit
                    tmp = ar[i];                                            //    *  BiggestNumber.findTheNextBiggerNumber(531)  -> missed 3 hits
                                                                           // Also here is a list that did not cause any behavior change nor a state change for that mutant.
                    ar[i] = ar[j];                                        //    * BiggestNumber.findTheNextBiggerNumber(52876)
                                                                         //    *  BiggestNumber.findTheNextBiggerNumber(414)
                    ar[j] = tmp;                                        // Can you think of a test case that would cause a state change in addition to the current behavior change?  

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
        lineNumber: 30,
        column: { a: 31, b: 32 },
        type: "Red",
        id: 0,
        subject: "subject_5",
        mutationOperation: "//Origin: j >= 0"
      },
      infected: [],
      diffs: [{ lineNumber: { a: 31, b: 46 }, type: "Missed", message: "1-3 hits missed by the mutant" }]
    }
  ];
  export const javaCode = `import java.util.Arrays;
  
import org.w3c.dom.css.Counter;
  
public class BiggestNumber {

    public static long findTheNextBiggerNumber(long n) {

        int ar[] = new int[20]; // long is 64 bit, so max 19 digits can be possible

        int length = 0, tmp;

        boolean found = false;
        while (n > 0) {
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
  