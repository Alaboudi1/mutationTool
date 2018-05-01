export const mutants = [
  {
    code: `// Introduction to Software Testing
// Authors: Paul Ammann & Jeff Offutt
// Chapter 1; page 13
// Can be run from command line
// See LastZeroTest.java for JUnit tests

public class LastZero
{

  /**
   * Find LAST index of zero
   *
   * @param x array to search
   * @return index of last 0 in x; -1 if absent
   * @throws NullPointerException if x is null
   */
  public static int lastZero (int[] x) 
  {
    int lastZeroIndex = -1;
    for (int i = 1; i < x.length; i++) //Original: i = 0
    {                                            //Test case(s) that cause the behavior change.
        if (x[i] == 0)                           //assert 4  ==  lastZero ([1,2,3,0,0,1]) 
        {                                        // assert -1 == lastZero ([1,2,3,1,1,1,4])
        lastZeroIndex = i;
        }
    }
    return lastZeroIndex;
  }
    
  public static void main (String []argv)
  {  
    assert 4  ==  lastZero ([1,-2,3,0,0,1])
    assert -1 == lastZero ([1,2,3,1,1,1,4])
}`,
    mutant: {
      lineNumber: 20,
      column: { a: 18, b: 19 },
      type: "Red",
      id: 0,
      subject: "subject_1",
      mutationOperation: "Original: i = 0"
    },
    infected: [
      // by assigning variable's value to mutants or involving mutant in constituting its value
      {
        lineNumber: 22,
        column: { a: 13, b: 17 }
      },
      {
        lineNumber: 24,
        column: { a: 25, b: 28 }
      }
    ],
    diffs: [
      {
        lineNumber: { a: 21, b: 26 },
        type: "Missed",
        message: "Missed one hit",
        TestCases:
          "assert 4  ==  lastZero ([1,2,3,0,0,1]) \n assert -1 == lastZero ([1,2,3,1,1,1,4])"
      }
    ]
  },
  //////////////////////////////////////////////////////////////////////////////////////////
  // {
  //   code: `// Introduction to Software Testing
  //   // Authors: Paul Ammann & Jeff Offutt
  //   // Chapter 1; page 13
  //   // Can be run from command line
  //   // See LastZeroTest.java for JUnit tests

  //   public class LastZero
  //   {

  //     /**
  //      * Find LAST index of zero
  //      *
  //      * @param x array to search
  //      * @return index of last 0 in x; -1 if absent
  //      * @throws NullPointerException if x is null
  //      */
  //      public static int lastZero (int[] x)
  //      {
  //        int lastZeroIndex = -1;
  //         for (int i = 0; i != x.length; i++)
  //         {
  //            if (x[i] == 0)
  //            {
  //             lastZeroIndex = i;
  //            }
  //         }
  //         return lastZeroIndex;
  //      }

  //      public static void main (String []argv)
  //      {  // Driver method for lastZero
  //         // Read an array from standard input, call lastZero()
  //         int []inArr = new int [argv.length];
  //         if (argv.length == 0)
  //         {
  //            System.out.println ("Usage: java LastZero v1 [v2] [v3] ... ");
  //            return;
  //         }

  //         for (int i = 0; i< argv.length; i++)
  //         {
  //            try
  //            {
  //               inArr [i] = Integer.parseInt (argv[i]);
  //            }
  //            catch (NumberFormatException e)
  //            {
  //               System.out.println ("Entry must be a integer, using 1.");
  //               inArr [i] = 1;
  //            }
  //         }

  //         System.out.println ("The last index of zero is: " + lastZero (inArr));
  //      }
  //   }`,
  //   mutant: {
  //     lineNumber: 20,
  //     column: { a: 19, b: 20 },
  //     type: "Orang",
  //     id: 2,
  //     mutationOperation: "Original: i < x.length"
  //   },
  //   infected: [
  //     // by assigning variable's value to mutants or involving mutant in constituting its value
  //     {
  //       lineNumber: 22,
  //       column: { a: 23, b: 25 }
  //     },
  //     {
  //       lineNumber: 24,
  //       column: { a: 23, b: 25 }
  //     }
  //   ],
  //   diffs: []
  // },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    code: `// Introduction to Software Testing
// Authors: Paul Ammann & Jeff Offutt
// Chapter 1; page 13
// Can be run from command line
// See LastZeroTest.java for JUnit tests

public class LastZero
{

  /**
   * Find LAST index of zero
   *
   * @param x array to search
   * @return index of last 0 in x; -1 if absent
   * @throws NullPointerException if x is null
   */
  public static int lastZero (int[] x)
  {
    int lastZeroIndex = -1;
    for (int i = 0; i < x.length; i++)
    {
        if (x[i] <= 0)//Original: x[i] == 0
        {                              //Test case(s) that cause the behavior change.
        lastZeroIndex = i;            //assert 4  ==  lastZero ([1,-2,3,0,0,1])
        }
    }
    return lastZeroIndex;
  }
    
  public static void main (String []argv)
  {  
    assert 4  ==  lastZero ([1,-2,3,0,0,1])
    assert -1 == lastZero ([1,2,3,1,1,1,4])
}`,
    mutant: {
      lineNumber: 22,
      column: { a: 18, b: 20 },
      type: "Red",
      id: 1,
      subject: "subject_1",
      mutationOperation: "Original: x[i] == 0"
    },
    infected: [],
    diffs: [
      {
        lineNumber: { a: 24, b: 24 },
        type: "Extra",
        message: "Extra 1 hit by mutant",
        TestCases: "assert 4  ==  lastZero ([1,-2,3,0,0,1])"
      }
    ]
  }
];
export const javaCode = `// Introduction to Software Testing
// Authors: Paul Ammann & Jeff Offutt
// Chapter 1; page 13
// Can be run from command line
// See LastZeroTest.java for JUnit tests

public class LastZero
{

  /**
   * Find LAST index of zero
   *
   * @param x array to search
   * @return index of last 0 in x; -1 if absent
   * @throws NullPointerException if x is null
   */
  public static int lastZero (int[] x)
  {
    int lastZeroIndex = -1;
    for (int i = 0; i < x.length; i++)
    {
        if (x[i] == 0)                
        {                             
        lastZeroIndex = i;            
        }
    }
    return lastZeroIndex;
  }
    
  public static void main (String []argv)
  {  
    assert 4  ==  lastZero ([1,-2,3,0,0,1])
    assert -1 == lastZero ([1,2,3,1,1,1,4])
}`;
