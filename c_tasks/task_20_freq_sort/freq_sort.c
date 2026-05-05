/*
 * Завдання 20. Сортування символів за частотою (за спаданням).
 * Якщо два символи мають однакову частоту, зберігається їхній початковий
 * порядок (стабільне сортування).
 *
 * Ідея алгоритму:
 *   1. Підрахуємо частоту кожного байта у counts[256].
 *   2. Створимо масив записів {ch, freq, orig_idx}.
 *   3. Відсортуємо за компаратором: спершу за freq за спаданням, при
 *      рівній частоті — за зростанням orig_idx (підтримує стабільність,
 *      незалежно від того, чи qsort стабільна).
 *   4. Перепишемо вхідний масив у цьому порядку.
 *
 * Часова складність:  O(N log N) — сортування.
 * Просторова складність: O(N) — масив Item.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char ch;
    int  freq;
    int  orig_idx;
} Item;

static int cmp_item(const void *a, const void *b) {
    const Item *ia = (const Item *)a;
    const Item *ib = (const Item *)b;
    if (ia->freq != ib->freq) {
        /* Спадання за частотою. */
        return ib->freq - ia->freq;
    }
    /* Тай-брейк: зростання за початковою позицією. */
    return ia->orig_idx - ib->orig_idx;
}

static void sort_by_frequency(char *arr, size_t n) {
    int counts[256] = {0};
    for (size_t i = 0; i < n; i++) counts[(unsigned char)arr[i]]++;

    Item *items = (Item *)malloc(sizeof(Item) * n);
    for (size_t i = 0; i < n; i++) {
        items[i].ch       = arr[i];
        items[i].freq     = counts[(unsigned char)arr[i]];
        items[i].orig_idx = (int)i;
    }
    qsort(items, n, sizeof(Item), cmp_item);

    for (size_t i = 0; i < n; i++) arr[i] = items[i].ch;
    free(items);
}

int main(void) {
    char arr1[] = "tree";
    sort_by_frequency(arr1, strlen(arr1));
    printf("\"tree\"  -> \"%s\"\n", arr1);  /* очікуємо "eetr" */

    char arr2[] = "aabbc";
    sort_by_frequency(arr2, strlen(arr2));
    printf("\"aabbc\" -> \"%s\"\n", arr2);  /* очікуємо "aabbc" */

    char arr3[] = "Aabb";
    sort_by_frequency(arr3, strlen(arr3));
    printf("\"Aabb\"  -> \"%s\"\n", arr3);  /* очікуємо "bbAa" */

    char arr4[] = "cccaaabb";
    sort_by_frequency(arr4, strlen(arr4));
    printf("\"cccaaabb\" -> \"%s\"\n", arr4); /* очікуємо "cccaaabb" */

    return 0;
}
