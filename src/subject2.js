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
                                                    //Collections.sort(availableSlotList);      // This mutant caused a behavior change by removing this line. 
            String slot = availableSlotList.get(0).toString();                                 // This mutant caused also a state change.
            Car car = new Car(regNo, color);                                                  // This mutant effects other values in the program. There are underlined with black color.
            this.map1.put(slot, car);                                                        //  See the table below for state changes comparison between the original code and the mutated code after running park() test case
            this.map2.put(regNo, slot);                                                     // on the original program as well as the mutant:
            if (this.map3.containsKey(color)) {                        
                ArrayList<String> regNoList = this.map3.get(color);                       //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||                                          
                this.map3.remove(color);                                                 //||| State                 ||| Original                                      ||| Mutant                                        |||
                regNoList.add(regNo);                                                   // ||| map1                  ||| {1=KA-01-HH-1234 White, 3=KA-01-HH-54321 Red} |||{1=KA-01-HH-1234 White, 2=KA-01-HH-9999 White} |||
                this.map3.put(color, regNoList);                                       //  ||| map2                  ||| {KA-01-HH-54321=3, KA-01-HH-1234=1}           |||{1=KA-01-HH-1234 White, 2=KA-01-HH-9999 White} |||
            } else {                                                                  //   |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
                ArrayList<String> regNoList = new ArrayList<String>();               //**Affected state is a state has different values than the original program after the mutation occurred.
                regNoList.add(regNo);
                this.map3.put(color, regNoList);                                      //Test case(s) that cause the state change is :
            }                                                                        //public void park() throws Exception {...}
            System.out.println("Allocated slot number: " + slot);                   // Can you capture this state change?
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
}
@After
public void cleanUpStreams() {
        System.setOut(null);
}

@Test
public void createParkingLot() throws Exception {
    parkingLot.createParkingLot("6");
    assertEquals(6, parkingLot.MAX_SIZE);
    assertEquals(6, parkingLot.availableSlotList.size());
    assertTrue("createdparkinglotwith6slots".equalsIgnoreCase(outContent.toString().trim().replace(" ", "")));
}

@Test
public void park() throws Exception {
    parkingLot.park("KA-01-HH-1234", "White");
    parkingLot.park("KA-01-HH-9999", "White");
    assertEquals("Sorry,parkinglotisnotcreated\n" + "\n" + "Sorry,parkinglotisnotcreated",
            outContent.toString().trim().replace(" ", ""));
    parkingLot.createParkingLot("6");
    parkingLot.park("KA-01-HH-1234", "White");
    parkingLot.park("KA-01-HH-9999", "White");
    parkingLot.leave("2");
    parkingLot.park("KA-01-HH-1234", "White");
    assertEquals(4, parkingLot.availableSlotList.size());
}
@Test
public void leave() throws Exception {
    parkingLot.leave("2");
    assertEquals("Sorry,parkinglotisnotcreated", outContent.toString().trim().replace(" ", ""));
    parkingLot.createParkingLot("6");
    parkingLot.park("KA-01-HH-1234", "White");
    parkingLot.park("KA-01-HH-9999", "White");
    parkingLot.leave("4");
    assertEquals("Sorry,parkinglotisnotcreated\n" + "\n" + "Createdparkinglotwith6slots\n" + "\n"
            + "Allocatedslotnumber:1\n" + "\n" + "Allocatedslotnumber:2\n" + "\n" + "Slotnumber4isalreadyempty",
            outContent.toString().trim().replace(" ", ""));
}

@Test
public void status() throws Exception {
    parkingLot.status();
    assertEquals("Sorry,parkinglotisnotcreated", outContent.toString().trim().replace(" ", ""));
    parkingLot.createParkingLot("6");
    parkingLot.park("KA-01-HH-1234", "White");
    parkingLot.park("KA-01-HH-9999", "White");
    parkingLot.status();
    assertEquals(
            "Sorry,parkinglotisnotcreated\n" + "\n" + "Createdparkinglotwith6slots\n" + "\n"
                    + "Allocatedslotnumber:1\n" + "\n" + "Allocatedslotnumber:2\n" + "\n"
                    + "SlotNo.\tRegistrationNo.\tColor\n" + "1\tKA-01-HH-1234\tWhite\n" + "2\tKA-01-HH-9999\tWhite",
            outContent.toString().trim().replace(" ", ""));
}
`,
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
        lineNumber: 55,
        column: { a: 27, b: 31 }
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
        } else if (this.map1.size() >= 0) { //Original: this.map1.size() > 0           //Note: This mutant did not cause any behavior or state change.
            Car carToLeave = this.map1.get(slotNo);                                   //the leave() test case cause the original code (this.map1.size() > 0)  to evaluate to true.
            if (carToLeave != null) {                                                //the leave() test case cause the mutated code (this.map1.size() >= 0)  to evaluate to true.
                this.map1.remove(slotNo);                                           //Can you think of a test input that would trigger a behavior change for this mutant?        
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
}
@After
public void cleanUpStreams() {
        System.setOut(null);
}

@Test
public void createParkingLot() throws Exception {
    parkingLot.createParkingLot("6");
    assertEquals(6, parkingLot.MAX_SIZE);
    assertEquals(6, parkingLot.availableSlotList.size());
    assertTrue("createdparkinglotwith6slots".equalsIgnoreCase(outContent.toString().trim().replace(" ", "")));
}

@Test
public void park() throws Exception {
    parkingLot.park("KA-01-HH-1234", "White");
    parkingLot.park("KA-01-HH-9999", "White");
    assertEquals("Sorry,parkinglotisnotcreated\n" + "\n" + "Sorry,parkinglotisnotcreated",
            outContent.toString().trim().replace(" ", ""));
    parkingLot.createParkingLot("6");
    parkingLot.park("KA-01-HH-1234", "White");
    parkingLot.park("KA-01-HH-9999", "White");
    parkingLot.leave("2");
    parkingLot.park("KA-01-HH-1234", "White");
    assertEquals(4, parkingLot.availableSlotList.size());
}
@Test
public void leave() throws Exception {
    parkingLot.leave("2");
    assertEquals("Sorry,parkinglotisnotcreated", outContent.toString().trim().replace(" ", ""));
    parkingLot.createParkingLot("6");
    parkingLot.park("KA-01-HH-1234", "White");
    parkingLot.park("KA-01-HH-9999", "White");
    parkingLot.leave("4");
    assertEquals("Sorry,parkinglotisnotcreated\n" + "\n" + "Createdparkinglotwith6slots\n" + "\n"
            + "Allocatedslotnumber:1\n" + "\n" + "Allocatedslotnumber:2\n" + "\n" + "Slotnumber4isalreadyempty",
            outContent.toString().trim().replace(" ", ""));
}

@Test
public void status() throws Exception {
    parkingLot.status();
    assertEquals("Sorry,parkinglotisnotcreated", outContent.toString().trim().replace(" ", ""));
    parkingLot.createParkingLot("6");
    parkingLot.park("KA-01-HH-1234", "White");
    parkingLot.park("KA-01-HH-9999", "White");
    parkingLot.status();
    assertEquals(
            "Sorry,parkinglotisnotcreated\n" + "\n" + "Createdparkinglotwith6slots\n" + "\n"
                    + "Allocatedslotnumber:1\n" + "\n" + "Allocatedslotnumber:2\n" + "\n"
                    + "SlotNo.\tRegistrationNo.\tColor\n" + "1\tKA-01-HH-1234\tWhite\n" + "2\tKA-01-HH-9999\tWhite",
            outContent.toString().trim().replace(" ", ""));
}
`,
    mutant: {
      lineNumber: 76,
      column: { a: 37, b: 39 },
      type: "Orange",
      id: 1,
      subject: "subject_2",

      mutationOperation: "Original: this.map1.size() > 0"
    },
    infected: [
      // by assigning variable's value to mutants or involving mutant in constituting its value
    ],
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
}
ParkingLot parkingLot = new ParkingLot();
private final ByteArrayOutputStream outContent = new ByteArrayOutputStream();

@Before
public void setUpStreams() {
        System.setOut(new PrintStream(outContent));
}

@After
public void cleanUpStreams() {
        System.setOut(null);
}

@Test
public void createParkingLot() throws Exception {
    parkingLot.createParkingLot("6");
    assertEquals(6, parkingLot.MAX_SIZE);
    assertEquals(6, parkingLot.availableSlotList.size());
    assertTrue("createdparkinglotwith6slots".equalsIgnoreCase(outContent.toString().trim().replace(" ", "")));
}

@Test
public void park() throws Exception {
    parkingLot.park("KA-01-HH-1234", "White");
    parkingLot.park("KA-01-HH-9999", "White");
    assertEquals("Sorry,parkinglotisnotcreated" + "" + "Sorry,parkinglotisnotcreated",
            outContent.toString().trim().replace(" ", ""));
    parkingLot.createParkingLot("6");
    parkingLot.park("KA-01-HH-1234", "White");
    parkingLot.park("KA-01-HH-9999", "White");
    parkingLot.leave("2");
    parkingLot.park("KA-01-HH-1234", "White");
    assertEquals(4, parkingLot.availableSlotList.size());
}
@Test
public void leave() throws Exception {
    parkingLot.leave("2");
    assertEquals("Sorry,parkinglotisnotcreated", outContent.toString().trim().replace(" ", ""));
    parkingLot.createParkingLot("6");
    parkingLot.park("KA-01-HH-1234", "White");
    parkingLot.park("KA-01-HH-9999", "White");
    parkingLot.leave("4");
    assertEquals("Sorry,parkinglotisnotcreated" + "" + "Createdparkinglotwith6slots" + ""
            + "Allocatedslotnumber:1" + "" + "Allocatedslotnumber:2" + "" + "Slotnumber4isalreadyempty",
            outContent.toString().trim().replace(" ", ""));
}

@Test
public void status() throws Exception {
    parkingLot.status();
    assertEquals("Sorry,parkinglotisnotcreated", outContent.toString().trim().replace(" ", ""));
    parkingLot.createParkingLot("6");
    parkingLot.park("KA-01-HH-1234", "White");
    parkingLot.park("KA-01-HH-9999", "White");
    parkingLot.status();
    assertEquals(
            "Sorry,parkinglotisnotcreated" + "" + "Createdparkinglotwith6slots" + ""
                    + "Allocatedslotnumber:1" + "" + "Allocatedslotnumber:2" + ""
                    + "SlotNo.\tRegistrationNo.\tColor" + "1\tKA-01-HH-1234\tWhite" + "2\tKA-01-HH-9999\tWhite",
            outContent.toString().trim().replace(" ", ""));
}

`;
