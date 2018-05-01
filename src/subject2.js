export const mutants = [

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
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
            Car carToLeave = this.map1.get(slotNo);                                   // Can you think of a test input that would trigger a behavior change for this mutant? 
            if (carToLeave != null) {                                                // All the test cases exercise findTheNextBiggerNumber method overed this mutant.
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
      lineNumber: 76,
      column: { a: 37, b: 39 },
      type: "Orange",
      id: 0,
      subject: "subject_2",

      mutationOperation: "Original: this.map1.size() > 0"
    },
    infected: [
      // by assigning variable's value to mutants or involving mutant in constituting its value
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
            for (int i = 0; i <= this.MAX_SIZE; i++) {   //Original: int i = 1;           //Note: This mutant caused behavior change but no state change!
                String key = Integer.toString(i);                                        // It seems that the mutant has some extra coverage that the actual program does not have.
                if (this.map1.containsKey(key)) {                                       //All the test cases that exercise status seem to trigger the change in the behavior but none change any of the program state.
                    car = this.map1.get(key);                                          // Can you think of a test case that would cause a state change in addition to the current behavior change.  
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
            for (int i=1; i < regNoList.size(); i++) {
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
      lineNumber: 106,
      column: { a: 26, b: 27 },
      type: "Red",
      id: 1,
      subject: "subject_2",

      mutationOperation: " Original: int i = 1;"
    },
    infected: [
      // by assigning variable's value to mutants or involving mutant in constituting its value
    ],
    diffs: [{ lineNumber: { a: 107, b: 108 }, type: "Extra", message: "1 hit extra by mutant" }]
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
}`;
