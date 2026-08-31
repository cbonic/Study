package study;

public class Task6_6 {
    public static void main(String[] args) {
        String[] names = {"Aki", "Ken", "Mina"};
        String numText = "10a";

        try {
            int value = Integer.parseInt(numText);
            System.out.println("value: " + value);
        } catch (NumberFormatException e) {
            System.out.println("数値に変換できません");
            System.out.println("例外の種類: " + e.getClass().getSimpleName());
        }

        try {
            System.out.println("name: " + names[3]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("配列の範囲外アクセスが発生しました");
            System.out.println("例外の種類: " + e.getClass().getSimpleName());
        } finally {
            System.out.println("finallyの処理です");
        }

        System.out.println("処理を続けます");
    }
}