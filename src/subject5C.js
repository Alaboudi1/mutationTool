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

            for (int j = i; j >= 0; j--) { //Mutant: j > 0

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
