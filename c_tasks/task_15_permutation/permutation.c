/*
 * Завдання 15. Перевірка, чи один рядок є перестановкою іншого.
 *
 * Ідея алгоритму:
 *   Два рядки є перестановками, якщо у них однакові мультимножини байтів.
 *   Інакше кажучи, кожен символ повинен зустрічатись однакову кількість
 *   разів. Заведемо масив counts[256], збільшимо лічильник для кожного
 *   байта першого рядка та зменшимо для кожного байта другого. Якщо у
 *   результаті всі лічильники нульові — це перестановка.
 *
 *   Швидке відсікання: якщо довжини різні, відразу повертаємо false.
 *
 * Часова складність:  O(L1 + L2) — лінійно по довжині.
 * Просторова складність: O(1) — фіксований масив на 256 елементів.
 *
 * Використання:
 *   ./permutation strings.txt
 *
 * Формат вхідного файлу: ДВА рядки, по одному рядку на кожен.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

static bool is_permutation(const char *a, const char *b) {
    int counts[256] = {0};
    size_t la = strlen(a);
    size_t lb = strlen(b);
    if (la != lb) return false;
    for (size_t i = 0; i < la; i++) counts[(unsigned char)a[i]]++;
    for (size_t i = 0; i < lb; i++) counts[(unsigned char)b[i]]--;
    for (int i = 0; i < 256; i++) {
        if (counts[i] != 0) return false;
    }
    return true;
}

int main(int argc, char **argv) {
    if (argc != 2) {
        fprintf(stderr, "Використання: %s <file>\n", argv[0]);
        return 1;
    }
    FILE *f = fopen(argv[1], "r");
    if (!f) { perror("fopen"); return 1; }

    char a[4096], b[4096];
    if (!fgets(a, sizeof(a), f) || !fgets(b, sizeof(b), f)) {
        fprintf(stderr, "Файл повинен містити два рядки\n");
        fclose(f);
        return 1;
    }
    fclose(f);

    a[strcspn(a, "\r\n")] = '\0';
    b[strcspn(b, "\r\n")] = '\0';

    bool ok = is_permutation(a, b);
    printf("%s\n", ok ? "true" : "false");
    return 0;
}
