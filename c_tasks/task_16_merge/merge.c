/*
 * Завдання 16. Обʼєднати два масиви, видалити дублікати, повернути
 * відсортований масив унікальних елементів.
 *
 * Ідея алгоритму:
 *   1. Скопіюємо обидва масиви в один спільний.
 *   2. Посортуємо його (qsort, в середньому O(N log N)).
 *   3. Пройдемо по посортованому масиву та залишимо лише ті елементи,
 *      що відрізняються від попереднього (стиснення in-place).
 *
 *   Альтернативно можна використати hash-set, але qsort + лінійне
 *   стиснення дає той самий час O(N log N) із константним обʼємом
 *   додаткової памʼяті понад спільний буфер.
 *
 * Часова складність:  O((N1 + N2) * log(N1 + N2)) — сортування.
 * Просторова складність: O(N1 + N2) — обʼєднаний масив.
 */

#include <stdio.h>
#include <stdlib.h>

static int cmp_int(const void *a, const void *b) {
    int x = *(const int *)a;
    int y = *(const int *)b;
    return (x > y) - (x < y);
}

/*
 * Повертає динамічно виділений масив унікальних елементів a і b у
 * відсортованому порядку. Розмір записується у *out_n.
 * Викликаючий код відповідає за free() результату.
 */
static int *merge_unique_sorted(const int *a, size_t na,
                                const int *b, size_t nb,
                                size_t *out_n) {
    size_t total = na + nb;
    if (total == 0) { *out_n = 0; return NULL; }

    int *merged = (int *)malloc(sizeof(int) * total);
    if (!merged) { *out_n = 0; return NULL; }

    for (size_t i = 0; i < na; i++) merged[i]      = a[i];
    for (size_t i = 0; i < nb; i++) merged[na + i] = b[i];

    qsort(merged, total, sizeof(int), cmp_int);

    /* Стиснення дублікатів. */
    size_t k = 1;
    for (size_t i = 1; i < total; i++) {
        if (merged[i] != merged[k - 1]) {
            merged[k++] = merged[i];
        }
    }
    *out_n = k;
    return merged;
}

int main(void) {
    int a[] = {3, 1, 4, 1, 5, 9, 2, 6};
    int b[] = {5, 3, 5, 8, 9, 7};
    size_t out_n;

    int *out = merge_unique_sorted(a, sizeof(a) / sizeof(*a),
                                   b, sizeof(b) / sizeof(*b),
                                   &out_n);

    printf("Унікальний відсортований масив:");
    for (size_t i = 0; i < out_n; i++) printf(" %d", out[i]);
    putchar('\n');
    free(out);
    return 0;
}
