/*
 * Завдання 11. Анаграми зі списку слів у .txt файлі.
 *
 * Ідея алгоритму:
 *   Анаграма — це слово, утворене перестановкою літер іншого слова. Тому
 *   у кожному слові один і той самий мультимножина літер. Якщо посортувати
 *   літери слова в алфавітному порядку, отримаємо канонічний "ключ", який
 *   є однаковим для всіх анаграм. Залишається згрупувати слова за цим
 *   ключем — для цього ми сортуємо масив пар (ключ, оригінал) за ключем
 *   та виводимо послідовні групи з однаковим ключем.
 *
 * Часова складність:
 *   - Сортування літер у кожному слові: O(L log L), де L — довжина слова.
 *   - Сортування масиву з N слів за ключем: O(N * L * log N) (порівняння
 *     рядків коштує O(L)).
 *   - Загалом: O(N * L * (log L + log N)).
 *
 * Просторова складність:
 *   O(N * L) — копія слів та їхніх ключів у пам'яті.
 *
 * Використання:
 *   ./anagrams words.txt
 *
 * Формат вхідного файлу: слова через пробіли або переноси рядків.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_WORDS 100000
#define MAX_LEN   256

typedef struct {
    char *original; /* слово як було у файлі (нижній регістр) */
    char *key;      /* посортовані літери — канонічний ключ */
} Word;

/* Порівняння для qsort масиву char (потрібно для сортування літер у слові). */
static int cmp_char(const void *a, const void *b) {
    return *(const unsigned char *)a - *(const unsigned char *)b;
}

/* Порівняння двох Word за ключем (для qsort). */
static int cmp_word(const void *a, const void *b) {
    const Word *wa = (const Word *)a;
    const Word *wb = (const Word *)b;
    return strcmp(wa->key, wb->key);
}

/* Будує канонічний ключ для слова: копія, переведена у нижній регістр і посортована. */
static char *build_key(const char *s) {
    size_t n = strlen(s);
    char *copy = (char *)malloc(n + 1);
    if (!copy) return NULL;
    for (size_t i = 0; i < n; i++) {
        copy[i] = (char)tolower((unsigned char)s[i]);
    }
    copy[n] = '\0';
    qsort(copy, n, 1, cmp_char);
    return copy;
}

/* Копія слова в нижньому регістрі (щоб порівняння були регістронезалежними). */
static char *to_lower_copy(const char *s) {
    size_t n = strlen(s);
    char *copy = (char *)malloc(n + 1);
    if (!copy) return NULL;
    for (size_t i = 0; i < n; i++) {
        copy[i] = (char)tolower((unsigned char)s[i]);
    }
    copy[n] = '\0';
    return copy;
}

int main(int argc, char **argv) {
    if (argc != 2) {
        fprintf(stderr, "Використання: %s <words.txt>\n", argv[0]);
        return 1;
    }

    FILE *f = fopen(argv[1], "r");
    if (!f) {
        perror("fopen");
        return 1;
    }

    Word *words = (Word *)malloc(sizeof(Word) * MAX_WORDS);
    if (!words) {
        fclose(f);
        return 1;
    }
    size_t count = 0;

    char buf[MAX_LEN];
    while (count < MAX_WORDS && fscanf(f, "%255s", buf) == 1) {
        words[count].original = to_lower_copy(buf);
        words[count].key      = build_key(buf);
        if (!words[count].original || !words[count].key) {
            fprintf(stderr, "Недостатньо памʼяті\n");
            break;
        }
        count++;
    }
    fclose(f);

    /* Сортуємо слова за ключем — анаграми опиняться поруч. */
    qsort(words, count, sizeof(Word), cmp_word);

    /* Проходимо масив і виводимо послідовні групи з однаковим ключем. */
    size_t i = 0;
    while (i < count) {
        size_t j = i + 1;
        while (j < count && strcmp(words[i].key, words[j].key) == 0) {
            j++;
        }
        /* Виводимо групу, навіть якщо в ній лише одне слово (тривіальна група). */
        for (size_t k = i; k < j; k++) {
            if (k > i) putchar(' ');
            fputs(words[k].original, stdout);
        }
        putchar('\n');
        i = j;
    }

    /* Звільнення памʼяті. */
    for (size_t k = 0; k < count; k++) {
        free(words[k].original);
        free(words[k].key);
    }
    free(words);
    return 0;
}
