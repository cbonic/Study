package study;

public class Task4_27 {

    public static void main(String[] args) {

        String[] names = {"Aki", "Ken", "Mina"};

        try {
            System.out.println(names[3]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println(
                e.getClass().getSimpleName()
                + "：配列の範囲外アクセスが発生しました"
            );
        } finally {
            System.out.println("finallyの処理です");
        }

        System.out.println("処理を続けます");
    }
}
