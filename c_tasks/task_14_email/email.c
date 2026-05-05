/*
 * Завдання 14. Тип EmailAddress і впорядкування за доменом, потім за
 * іменем користувача.
 *
 * У Сі немає класів, тому "тип даних EmailAddress" реалізуємо як структуру
 * та набір функцій для роботи з нею. Метод compareTo() перетворюється на
 * функцію email_compare(), сумісну з qsort().
 *
 * Алгоритм клієнтської програми:
 *   1. Зчитує адреси з stdin (один рядок — одна адреса).
 *   2. Парсить кожну адресу на username і domain (по символу '@').
 *   3. Сортує всі адреси за компаратором (домен, тоді username).
 *   4. Записує впорядкований список у файл, переданий як argv[1].
 *
 * Часова складність:  O(N * log N * L), де N — кількість адрес,
 *                     L — середня довжина (порівняння рядків коштує O(L)).
 * Просторова складність: O(N * L) — копії username/domain/original.
 *
 * Використання:
 *   echo -e "bob@example.com\nalice@example.com\ncarol@aaa.com" | ./email out.txt
 */

#define _POSIX_C_SOURCE 200809L

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

typedef struct {
    char *username;
    char *domain;
    char *original;
} EmailAddress;

/* Розбір адреси виду "user@domain". Повертає false, якщо формат некоректний. */
static bool email_parse(const char *s, EmailAddress *e) {
    const char *at = strchr(s, '@');
    if (!at || at == s || *(at + 1) == '\0') return false;
    /* Заборонимо більше одного '@'. */
    if (strchr(at + 1, '@')) return false;

    size_t ulen = (size_t)(at - s);
    size_t dlen = strlen(at + 1);

    e->username = (char *)malloc(ulen + 1);
    e->domain   = (char *)malloc(dlen + 1);
    e->original = strdup(s);
    if (!e->username || !e->domain || !e->original) {
        free(e->username); free(e->domain); free(e->original);
        return false;
    }
    memcpy(e->username, s, ulen);     e->username[ulen] = '\0';
    memcpy(e->domain,   at + 1, dlen); e->domain[dlen]   = '\0';
    return true;
}

/* compareTo: впорядковує спочатку за доменом, потім за username. */
static int email_compare(const void *a, const void *b) {
    const EmailAddress *ea = (const EmailAddress *)a;
    const EmailAddress *eb = (const EmailAddress *)b;
    int c = strcmp(ea->domain, eb->domain);
    if (c != 0) return c;
    return strcmp(ea->username, eb->username);
}

/* Видаляє з кінця рядка \r, \n, пробіли. */
static void rstrip(char *s) {
    size_t n = strlen(s);
    while (n && (s[n - 1] == '\n' || s[n - 1] == '\r' ||
                 s[n - 1] == ' '  || s[n - 1] == '\t')) {
        s[--n] = '\0';
    }
}

int main(int argc, char **argv) {
    if (argc != 2) {
        fprintf(stderr, "Використання: %s <output.txt>\n", argv[0]);
        return 1;
    }

    EmailAddress *emails = NULL;
    size_t cap = 0, count = 0;
    char buf[1024];

    while (fgets(buf, sizeof(buf), stdin)) {
        rstrip(buf);
        if (buf[0] == '\0') continue;

        if (count == cap) {
            cap = cap ? cap * 2 : 16;
            emails = (EmailAddress *)realloc(emails, cap * sizeof(EmailAddress));
            if (!emails) { perror("realloc"); return 1; }
        }
        if (!email_parse(buf, &emails[count])) {
            fprintf(stderr, "Некоректна адреса (пропущено): %s\n", buf);
            continue;
        }
        count++;
    }

    qsort(emails, count, sizeof(EmailAddress), email_compare);

    FILE *out = fopen(argv[1], "w");
    if (!out) { perror("fopen"); return 1; }
    for (size_t i = 0; i < count; i++) {
        fprintf(out, "%s\n", emails[i].original);
    }
    fclose(out);

    for (size_t i = 0; i < count; i++) {
        free(emails[i].username);
        free(emails[i].domain);
        free(emails[i].original);
    }
    free(emails);
    return 0;
}
