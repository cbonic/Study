package app;

import model.*;
import constants.*;

public class Main {

    private String firstName = "山田";
    private String lastName = "太郎";

    private void printName(String firstName, String lastName) {
        System.out.println(firstName + lastName);
    }

    public static void main(String[] args) {
        Main main = new Main();

        main.printName(main.firstName, main.lastName);

        Item item = new Item("Keyboard", 3200);
        Book book = new Book("Java Basics", 1800, "Saito");

        item.showInfo();
        book.showInfo();
    }
}