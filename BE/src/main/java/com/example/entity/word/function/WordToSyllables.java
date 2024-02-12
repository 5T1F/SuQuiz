package com.example.entity.word.function;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class WordToSyllables {

    private static int getCHO(char syllable) {
        return ((syllable - 0xAC00)/28)/21;
    }
    private static int getJOONG(char syllable) {
        return ((syllable - 0xAC00)/28%21);
    }
    private static int getJONG(char syllable) {
        return ((syllable - 0xAC00)%28);
    }

    // 쌍자음 : 1, 4, 8, 10, 13
    private static char[] CHO = {'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'};
    // ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ", "ㅐ", "ㅒ", "ㅔ", "ㅖ", "ㅢ", "ㅚ", "ㅟ"];
    // 9 ㅘ 10 ㅙ 14 ㅝ 15 ㅞ
    private static char[] JOONG = {'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'};

    private static char[] JONG = {' ', 'ㄱ', 'ㄲ', 'ᆪ', 'ᆫ', 'ᆬ', 'ᆭ', 'ㄷ', 'ㄹ', 'ᆰ', 'ᆱ', 'ᆲ', 'ᆳ', 'ᆴ', 'ᆵ', 'ᆶ', 'ㅁ', 'ㅂ', 'ᆹ', 'ᆺ', 'ᆻ', 'ᆼ', 'ᆽ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'};

    private static int[] jongToChoMap = {
            -1, // 종성 없음
            0,  // ㄱ
            1,  // ㄲ
            -1, // ㄳ
            2,  // ㄴ
            -1, // ㄵ
            -1, // ㄶ
            3,  // ㄷ
            5,  // ㄹ
            -1, // ㄺ
            -1, // ㄻ
            -1, // ㄼ
            -1, // ㄽ
            -1, // ㄾ
            -1, // ㄿ
            -1, // ㅀ
            6,  // ㅁ
            7,  // ㅂ
            -1, // ㅄ
            9,  // ㅅ
            -1, // ㅆ
            11,  // ㅇ
            12, // ㅈ
            14, // ㅊ
            15, // ㅋ
            16, // ㅌ
            17, // ㅍ
            18  // ㅎ
    };

    public static char[] wordToSyllables(String word) {
        int count = 0;


        List<Character> syllables = new ArrayList<>();
        for (int i = 0; i < word.length(); i++) {

            char syllable = word.charAt(i);
            if (syllable == ' ') return new char[0];

            char cho = CHO[getCHO(syllable)];
            char joong = JOONG[getJOONG(syllable)];
            char jong = JONG[getJONG(syllable)];

            // 쌍자음일때
            if (getCHO(syllable) == 1 || getCHO(syllable) == 4 || getCHO(syllable) == 8 ||
                    getCHO(syllable) == 10 || getCHO(syllable) == 13) {
                syllables.add(CHO[getCHO(syllable)-1]);
                syllables.add(CHO[getCHO(syllable)-1]);
                count += 2;
            } else {    // 단자음일때
                syllables.add(cho);
                count += 1;
            }

            switch (getJOONG(syllable)) {
                case 9:
                    syllables.add(JOONG[8]);
                    syllables.add(JOONG[0]);
                    count += 2;
                    break;
                case 10:
                    syllables.add(JOONG[8]);
                    syllables.add(JOONG[1]);
                    count += 2;
                    break;
                case 14:
                    syllables.add(JOONG[13]);
                    syllables.add(JOONG[4]);
                    count += 2;
                    break;
                case 15:
                    syllables.add(JOONG[13]);
                    syllables.add(JOONG[5]);
                    count += 2;
                    break;
                default:
                    syllables.add(JOONG[getJOONG(syllable)]);
                    count += 1;
                    break;
            }
            // ㅁ 16 ㅂ 17 ㅅ 19 ㅈ 22 ㅌ 25 ㅍ 26 ㅎ 27
            // {'', 'ㄱ', 'ㄲ', 'ᆪ', 'ᆫ', 'ᆬ', 'ᆭ', 'ㄷ', 'ㄹ', 'ᆰ', 'ᆱ', 'ᆲ', 'ᆳ', 'ᆴ', 'ᆵ', 'ᆶ', 'ㅁ', 'ㅂ', 'ᆹ', 'ᆺ', 'ᆻ', 'ᆼ', 'ᆽ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'};
            System.out.println(getJONG(syllable));
//            syllables.add(CHO[getJOONG()])
            switch (getJONG(syllable)) {
                case 0:
                    break;
                case 2: // ㄲ
                    syllables.add(CHO[0]);
                    syllables.add(CHO[0]);
                    break;
                case 3: // ㄳ
                    syllables.add(CHO[0]);
                    syllables.add(CHO[9]);
                    break;
                case 5: // ㄵ
                    syllables.add(CHO[2]);
                    syllables.add(CHO[12]);
                    break;
                case 6: // ㄶ
                    syllables.add(CHO[2]);
                    syllables.add(CHO[18]);
                    break;
                case 9: // ㄺ
                    syllables.add(CHO[5]);
                    syllables.add(CHO[0]);
                    break;
                case 10: // ㄻ
                    syllables.add(CHO[5]);
                    syllables.add(CHO[6]);
                    break;
                case 11: // ㄼ
                    syllables.add(CHO[5]);
                    syllables.add(CHO[7]);
                    break;
                case 12: // ㄽ
                    syllables.add(CHO[5]);
                    syllables.add(CHO[9]);
                    break;
                case 13: // ㄾ
                    syllables.add(CHO[5]);
                    syllables.add(CHO[16]);
                    break;
                case 14: // ㄿ
                    syllables.add(CHO[5]);
                    syllables.add(CHO[17]);
                    break;
                case 15: // ㅀ
                    syllables.add(CHO[5]);
                    syllables.add(CHO[18]);
                    break;
                case 18: // ㅄ
                    syllables.add(CHO[7]);
                    syllables.add(CHO[9]);
                    break;
                case 20: // ㅆ
                    syllables.add(CHO[9]);
                    syllables.add(CHO[9]);
                    break;
                default:
                    syllables.add(CHO[jongToChoMap[getJONG(syllable)]]);
                    count -= 1;
                    break;
            }
            count += 2;
        }

        Character[] listToCharaters = new Character[syllables.size()];
        syllables.toArray(listToCharaters);

        char[] charatersToChars = new char[listToCharaters.length];
        for (int i = 0; i < charatersToChars.length; i++) {
            charatersToChars[i] = listToCharaters[i];
//            System.out.print(charatersToChars[i]);
        }

        return charatersToChars;
    }
}
