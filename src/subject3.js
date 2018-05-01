export const mutants = [
  {
    code: `package com.gojek.parkinglot;
    import java.util.*;
    
    /**
     * Created by prasadus on 26/06/16.
     */
    public class ParkingLot {
        int MAX_SIZE = 0;
        private class Car {
            String regNo;
            String color;
            public Car(String regNo, String color) {
                this.regNo = regNo;
                this.color = color;
            }
        }
        // Available slots list
        ArrayList<Integer> availableSlotList;
        // Map of Slot, Car
        Map<String, Car> map1;
        // Map of RegNo, Slot
        Map<String, String> map2;
        // Map of Color, List of RegNo
        Map<String, ArrayList<String>> map3;
    
    
        public void createParkingLot(String lotCount) {
            try {
                this.MAX_SIZE = Integer.parseInt(lotCount);
            } catch (Exception e) {
                System.out.println("Invalid lot count");
                System.out.println();
            }
            this.availableSlotList = new ArrayList<Integer>() {};
            for (int i=1; i<= this.MAX_SIZE; i++) {
                availableSlotList.add(i);
            }
            this.map1 = new HashMap<String, Car>();
            this.map2 = new HashMap<String, String>();
            this.map3 = new HashMap<String, ArrayList<String>>();
            System.out.println("Created parking lot with " + lotCount + " slots");
            System.out.println();
        }
        public void park(String regNo, String color) {
            if (this.MAX_SIZE == 0) {
                System.out.println("Sorry, parking lot is not created");
                System.out.println();
            } else if (this.map1.size() == this.MAX_SIZE) {
                System.out.println("Sorry, parking lot is full");
                System.out.println();
            } else {
                Collections.sort(availableSlotList);
                String slot = availableSlotList.get(0).toString();
                Car car = new Car(regNo, color);
                this.map1.put(slot, car);
                this.map2.put(regNo, slot);                                
                if (this.map3.containsKey(color)) {                        
                    ArrayList<String> regNoList = this.map3.get(color);                                                 
                    this.map3.remove(color);                               
                    regNoList.add(regNo);                                  
                    this.map3.put(color, regNoList);                       
                } else {                                                   
                    ArrayList<String> regNoList = new ArrayList<String>();
                    regNoList.add(regNo);
                    this.map3.put(color, regNoList);
                }
                System.out.println("Allocated slot number: " + slot);
                System.out.println();
                availableSlotList.remove(0);
            }
        }
        public void leave(String slotNo) {
            if (this.MAX_SIZE == 0) {
                System.out.println("Sorry, parking lot is not created");
                System.out.println();
            } else if (this.map1.size() > 0) {
                Car carToLeave = this.map1.get(slotNo);
                if (carToLeave != null) {
                    this.map1.remove(slotNo);
                    this.map2.remove(carToLeave.regNo);
                    ArrayList<String> regNoList = this.map3.get(carToLeave.color);
                    if (regNoList.contains(carToLeave.regNo)) {
                        regNoList.remove(carToLeave.regNo);
                    }
                    // Add the Lot No. back to available slot list.
                    this.availableSlotList.add(Integer.parseInt(slotNo));
                    System.out.println("Slot number " + slotNo + " is free");
                    System.out.println();
                } else {
                    System.out.println("Slot number " + slotNo + " is already empty");
                    System.out.println();
                }
            } else {
                System.out.println("Parking lot is empty");
                System.out.println();
            }
        }
        public void status() {
            if (this.MAX_SIZE == 0) {
                System.out.println("Sorry, parking lot is not created");
                System.out.println();
            } else if (this.map1.size() > 0) {
                // Print the current status.
                System.out.println("Slot No.\tRegistration No.\tColor");
                Car car;
                for (int i = 1; i <= this.MAX_SIZE; i++) {
                    String key = Integer.toString(i);
                    if (this.map1.containsKey(key)) {
                        car = this.map1.get(key);
                        System.out.println(i + "\t" + car.regNo + "\t" + car.color);
                    }
                }
                System.out.println();
            } else {
                System.out.println("Parking lot is empty");
                System.out.println();
            }
        }
        public void getRegistrationNumbersFromColor(String color) {
            if (this.MAX_SIZE == 0) {
                System.out.println("Sorry, parking lot is not created");
                System.out.println();
            } else if (this.map3.containsKey(color)) {
                ArrayList<String> regNoList = this.map3.get(color);
                System.out.println();
                for (int i=0; i < regNoList.size(); i++) {
                    if (!(i==regNoList.size() - 1)){
                        System.out.print(regNoList.get(i) + ",");
                    } else {
                        System.out.print(regNoList.get(i));
                    }
                }
            } else {
                System.out.println("Not found");
                System.out.println();
            }
        }
        public void getSlotNumbersFromColor(String color) {
            if (this.MAX_SIZE == 0) {
                System.out.println("Sorry, parking lot is not created");
                System.out.println();
            } else if (this.map3.containsKey(color)) {
                ArrayList<String> regNoList = this.map3.get(color);
                ArrayList<Integer> slotList = new ArrayList<Integer>();
                System.out.println();
                for (int i=0; i < regNoList.size(); i++) {
                    slotList.add(Integer.valueOf(this.map2.get(regNoList.get(i))));
                }
                                                   // Collections.sort(slotList);             //Note: This mutant caused behavior change but no state change!
                for (int j=0; j < slotList.size(); j++) {                                    //It seems that the mutant has removed a line of code without resulting in state change.
                    if (!(j == slotList.size() - 1)) {                                      // Does that code that the mutant remove effect the main functionality?
                        System.out.print(slotList.get(j) + ",");                           // See getSlotNumbersFromColor test case that cover that mutant.
                    } else {
                        System.out.print(slotList.get(j));
                    }
                }
                System.out.println();
            } else {
                System.out.println("Not found");
                System.out.println();
            }
        }
        public void getSlotNumberFromRegNo(String regNo) {
            if (this.MAX_SIZE == 0) {
                System.out.println("Sorry, parking lot is not created");
                System.out.println();
            } else if (this.map2.containsKey(regNo)) {
                System.out.println(this.map2.get(regNo));
            } else {
                System.out.println("Not found");
                System.out.println();
            }
        }
    }`,
    mutant: {
      lineNumber: 52,
      column: { a: 13, b: 49 },
      type: "Red",
      id: 0,
      subject: "subject_3",
      mutationOperation: " //Origin:Collections.sort(availableSlotList);"
    },
    infected: [
      // by assigning variable's value to mutants or involving mutant in constituting its value
      {
        lineNumber: 53,
        column: { a: 27, b: 44 }
      },
      {
        lineNumber: 53,
        column: { a: 20, b: 24 }
      },
      {
        lineNumber: 55,
        column: { a: 26, b: 31 }
      },
      {
        lineNumber: 56,
        column: { a: 34, b: 38 }
      },
      {
        lineNumber: 67,
        column: { a: 60, b: 64 }
      },
      {
        lineNumber: 69,
        column: { a: 13, b: 30 }
      }
    ],
    diffs: []
  },

  //////////////////////////////////////////////////////////////////////////////////////////
  {
    code: `package com.gojek.parkinglot;
import java.util.*;

/**
 * Created by prasadus on 26/06/16.
 */
public class ParkingLot {
    int MAX_SIZE = 0;
    private class Car {
        String regNo;
        String color;
        public Car(String regNo, String color) {
            this.regNo = regNo;
            this.color = color;
        }
    }
    // Available slots list
    ArrayList<Integer> availableSlotList;
    // Map of Slot, Car
    Map<String, Car> map1;
    // Map of RegNo, Slot
    Map<String, String> map2;
    // Map of Color, List of RegNo
    Map<String, ArrayList<String>> map3;


    public void createParkingLot(String lotCount) {
        try {
            this.MAX_SIZE = Integer.parseInt(lotCount);
        } catch (Exception e) {
            System.out.println("Invalid lot count");
            System.out.println();
        }
        this.availableSlotList = new ArrayList<Integer>() {};
        for (int i=1; i<= this.MAX_SIZE; i++) {
            availableSlotList.add(i);
        }
        this.map1 = new HashMap<String, Car>();
        this.map2 = new HashMap<String, String>();
        this.map3 = new HashMap<String, ArrayList<String>>();
        System.out.println("Created parking lot with " + lotCount + " slots");
        System.out.println();
    }
    public void park(String regNo, String color) {
        if (this.MAX_SIZE == 0) {
            System.out.println("Sorry, parking lot is not created");
            System.out.println();
        } else if (this.map1.size() == this.MAX_SIZE) {
            System.out.println("Sorry, parking lot is full");
            System.out.println();
        } else {
            Collections.sort(availableSlotList);
            String slot = availableSlotList.get(0).toString();
            Car car = new Car(regNo, color);
            this.map1.put(slot, car);
            this.map2.put(regNo, slot);
            if (this.map3.containsKey(color)) {
                ArrayList<String> regNoList = this.map3.get(color);
                this.map3.remove(color);
                regNoList.add(regNo);
                this.map3.put(color, regNoList);
            } else {
                ArrayList<String> regNoList = new ArrayList<String>();
                regNoList.add(regNo);
                this.map3.put(color, regNoList);
            }
            System.out.println("Allocated slot number: " + slot);
            System.out.println();
            availableSlotList.remove(0);
        }
    }
    public void leave(String slotNo) {
        if (this.MAX_SIZE == 0) {
            System.out.println("Sorry, parking lot is not created");
            System.out.println();
        } else if (this.map1.size() > 0) {
            Car carToLeave = this.map1.get(slotNo);
            if (carToLeave != null) {
                                         //Origin: this.map1.remove(slotNo);           // Final values of the effected states.
                this.map2.remove(carToLeave.regNo);                                    //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
                ArrayList<String> regNoList = this.map3.get(carToLeave.color);         //||| State                 ||| Original                                      ||| Mutant                                        |||
                if (regNoList.contains(carToLeave.regNo)) {                            //||| map1                  ||| {regNo:1=KA-01-HH-1234,color: White}          |||{1=KA-01-HH-1234 White, 2=KA-01-HH-9999 White} |||
                    regNoList.remove(carToLeave.regNo);                                //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| 
                }                                                                      //**Effected state is a state that was part of the mutated statement or directly got its value from a mutated state.
                // Add the Lot No. back to available slot list.
                this.availableSlotList.add(Integer.parseInt(slotNo));
                System.out.println("Slot number " + slotNo + " is free");              //Test case(s) that cause the state change.
                System.out.println();                                                  //public void leave2() throws Exception {...}
            } else {
                System.out.println("Slot number " + slotNo + " is already empty");
                System.out.println();
            }
        } else {
            System.out.println("Parking lot is empty");
            System.out.println();
        }
    }
    public void status() {
        if (this.MAX_SIZE == 0) {
            System.out.println("Sorry, parking lot is not created");
            System.out.println();
        } else if (this.map1.size() > 0) {
            // Print the current status.
            System.out.println("Slot No.\tRegistration No.\tColor");
            Car car;
            for (int i = 1; i <= this.MAX_SIZE; i++) {
                String key = Integer.toString(i);
                if (this.map1.containsKey(key)) {
                    car = this.map1.get(key);
                    System.out.println(i + "\t" + car.regNo + "\t" + car.color);
                }
            }
            System.out.println();
        } else {
            System.out.println("Parking lot is empty");
            System.out.println();
        }
    }
    public void getRegistrationNumbersFromColor(String color) {
        if (this.MAX_SIZE == 0) {
            System.out.println("Sorry, parking lot is not created");
            System.out.println();
        } else if (this.map3.containsKey(color)) {
            ArrayList<String> regNoList = this.map3.get(color);
            System.out.println();
            for (int i=0; i < regNoList.size(); i++) {
                if (!(i==regNoList.size() - 1)){
                    System.out.print(regNoList.get(i) + ",");
                } else {
                    System.out.print(regNoList.get(i));
                }
            }
        } else {
            System.out.println("Not found");
            System.out.println();
        }
    }
    public void getSlotNumbersFromColor(String color) {
        if (this.MAX_SIZE == 0) {
            System.out.println("Sorry, parking lot is not created");
            System.out.println();
        } else if (this.map3.containsKey(color)) {
            ArrayList<String> regNoList = this.map3.get(color);
            ArrayList<Integer> slotList = new ArrayList<Integer>();
            System.out.println();
            for (int i=0; i < regNoList.size(); i++) {
                slotList.add(Integer.valueOf(this.map2.get(regNoList.get(i))));
            }
            Collections.sort(slotList);
            for (int j=0; j < slotList.size(); j++) {
                if (!(j == slotList.size() - 1)) {
                    System.out.print(slotList.get(j) + ",");
                } else {
                    System.out.print(slotList.get(j));
                }
            }
            System.out.println();
        } else {
            System.out.println("Not found");
            System.out.println();
        }
    }
    public void getSlotNumberFromRegNo(String regNo) {
        if (this.MAX_SIZE == 0) {
            System.out.println("Sorry, parking lot is not created");
            System.out.println();
        } else if (this.map2.containsKey(regNo)) {
            System.out.println(this.map2.get(regNo));
        } else {
            System.out.println("Not found");
            System.out.println();
        }
    }
}`,
    mutant: {
      lineNumber: 79,
      column: { a: 17, b: 42 },
      type: "Red",
      id: 1,
      subject: "subject_3",

      mutationOperation: "//Origin: this.map1.remove(slotNo);"
    },
    infected: [],
    diffs: []
  }
];
export const javaCode = `package com.gojek.parkinglot;
  import java.util.*;
  
  /**
   * Created by prasadus on 26/06/16.
   */
  public class ParkingLot {
      int MAX_SIZE = 0;
      private class Car {
          String regNo;
          String color;
          public Car(String regNo, String color) {
              this.regNo = regNo;
              this.color = color;
          }
      }
      // Available slots list
      ArrayList<Integer> availableSlotList;
      // Map of Slot, Car
      Map<String, Car> map1;
      // Map of RegNo, Slot
      Map<String, String> map2;
      // Map of Color, List of RegNo
      Map<String, ArrayList<String>> map3;
  
  
      public void createParkingLot(String lotCount) {
          try {
              this.MAX_SIZE = Integer.parseInt(lotCount);
          } catch (Exception e) {
              System.out.println("Invalid lot count");
              System.out.println();
          }
          this.availableSlotList = new ArrayList<Integer>() {};
          for (int i=1; i<= this.MAX_SIZE; i++) {
              availableSlotList.add(i);
          }
          this.map1 = new HashMap<String, Car>();
          this.map2 = new HashMap<String, String>();
          this.map3 = new HashMap<String, ArrayList<String>>();
          System.out.println("Created parking lot with " + lotCount + " slots");
          System.out.println();
      }
      public void park(String regNo, String color) {
          if (this.MAX_SIZE == 0) {
              System.out.println("Sorry, parking lot is not created");
              System.out.println();
          } else if (this.map1.size() == this.MAX_SIZE) {
              System.out.println("Sorry, parking lot is full");
              System.out.println();
          } else {
              Collections.sort(availableSlotList);
              String slot = availableSlotList.get(0).toString();
              Car car = new Car(regNo, color);
              this.map1.put(slot, car);
              this.map2.put(regNo, slot);
              if (this.map3.containsKey(color)) {
                  ArrayList<String> regNoList = this.map3.get(color);
                  this.map3.remove(color);
                  regNoList.add(regNo);
                  this.map3.put(color, regNoList);
              } else {
                  ArrayList<String> regNoList = new ArrayList<String>();
                  regNoList.add(regNo);
                  this.map3.put(color, regNoList);
              }
              System.out.println("Allocated slot number: " + slot);
              System.out.println();
              availableSlotList.remove(0);
          }
      }
      public void leave(String slotNo) {
          if (this.MAX_SIZE == 0) {
              System.out.println("Sorry, parking lot is not created");
              System.out.println();
          } else if (this.map1.size() > 0) {
              Car carToLeave = this.map1.get(slotNo);
              if (carToLeave != null) {
                  this.map1.remove(slotNo);
                  this.map2.remove(carToLeave.regNo);
                  ArrayList<String> regNoList = this.map3.get(carToLeave.color);
                  if (regNoList.contains(carToLeave.regNo)) {
                      regNoList.remove(carToLeave.regNo);
                  }
                  // Add the Lot No. back to available slot list.
                  this.availableSlotList.add(Integer.parseInt(slotNo));
                  System.out.println("Slot number " + slotNo + " is free");
                  System.out.println();
              } else {
                  System.out.println("Slot number " + slotNo + " is already empty");
                  System.out.println();
              }
          } else {
              System.out.println("Parking lot is empty");
              System.out.println();
          }
      }
      public void status() {
          if (this.MAX_SIZE == 0) {
              System.out.println("Sorry, parking lot is not created");
              System.out.println();
          } else if (this.map1.size() > 0) {
              // Print the current status.
              System.out.println("Slot No.\tRegistration No.\tColor");
              Car car;
              for (int i = 0; i <= this.MAX_SIZE; i++) {
                  String key = Integer.toString(i);
                  if (this.map1.containsKey(key)) {
                      car = this.map1.get(key);
                      System.out.println(i + "\t" + car.regNo + "\t" + car.color);
                  }
              }
              System.out.println();
          } else {
              System.out.println("Parking lot is empty");
              System.out.println();
          }
      }
      public void getRegistrationNumbersFromColor(String color) {
          if (this.MAX_SIZE == 0) {
              System.out.println("Sorry, parking lot is not created");
              System.out.println();
          } else if (this.map3.containsKey(color)) {
              ArrayList<String> regNoList = this.map3.get(color);
              System.out.println();
              for (int i=0; i < regNoList.size(); i++) {
                  if (!(i==regNoList.size() - 1)){
                      System.out.print(regNoList.get(i) + ",");
                  } else {
                      System.out.print(regNoList.get(i));
                  }
              }
          } else {
              System.out.println("Not found");
              System.out.println();
          }
      }
      public void getSlotNumbersFromColor(String color) {
          if (this.MAX_SIZE == 0) {
              System.out.println("Sorry, parking lot is not created");
              System.out.println();
          } else if (this.map3.containsKey(color)) {
              ArrayList<String> regNoList = this.map3.get(color);
              ArrayList<Integer> slotList = new ArrayList<Integer>();
              System.out.println();
              for (int i=0; i < regNoList.size(); i++) {
                  slotList.add(Integer.valueOf(this.map2.get(regNoList.get(i))));
              }
              Collections.sort(slotList);
              for (int j=0; j < slotList.size(); j++) {
                  if (!(j == slotList.size() - 1)) {
                      System.out.print(slotList.get(j) + ",");
                  } else {
                      System.out.print(slotList.get(j));
                  }
              }
              System.out.println();
          } else {
              System.out.println("Not found");
              System.out.println();
          }
      }
      public void getSlotNumberFromRegNo(String regNo) {
          if (this.MAX_SIZE == 0) {
              System.out.println("Sorry, parking lot is not created");
              System.out.println();
          } else if (this.map2.containsKey(regNo)) {
              System.out.println(this.map2.get(regNo));
          } else {
              System.out.println("Not found");
              System.out.println();
          }
      }
  }`;
