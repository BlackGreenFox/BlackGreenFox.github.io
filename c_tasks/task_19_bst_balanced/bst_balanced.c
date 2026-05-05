/*
 * Завдання 19. Перевірка, чи є бінарне дерево пошуку збалансованим.
 *
 * Визначення:
 *   Дерево вважається збалансованим за висотою, якщо для КОЖНОЇ вершини
 *   |height(left) - height(right)| <= 1.
 *
 * Ідея алгоритму:
 *   Наївне рішення обчислює висоту окремо для кожної вершини — O(N^2).
 *   Ефективніший варіант: одночасно з обчисленням висоти повертати
 *   спецзначення (-1), якщо десь нижче знайдено дисбаланс. Це дозволяє
 *   обійти все дерево за один прохід.
 *
 * Часова складність:  O(N).
 * Просторова складність: O(H) — глибина рекурсії, де H — висота дерева.
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct Node {
    int          value;
    struct Node *left;
    struct Node *right;
} Node;

static Node *node_new(int v) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->value = v;
    n->left = n->right = NULL;
    return n;
}

static void tree_free(Node *n) {
    if (!n) return;
    tree_free(n->left);
    tree_free(n->right);
    free(n);
}

/* Повертає висоту піддерева або -1, якщо знайдено дисбаланс. */
static int check_height(Node *n) {
    if (!n) return 0;
    int lh = check_height(n->left);
    if (lh < 0) return -1;
    int rh = check_height(n->right);
    if (rh < 0) return -1;
    if (lh - rh > 1 || rh - lh > 1) return -1;
    return 1 + (lh > rh ? lh : rh);
}

static bool is_balanced(Node *root) {
    return check_height(root) >= 0;
}

int main(void) {
    /*
     * Збалансоване BST:
     *        4
     *       / \
     *      2   6
     *     /\   /\
     *    1  3 5  7
     */
    Node *t1 = node_new(4);
    t1->left  = node_new(2);
    t1->right = node_new(6);
    t1->left->left   = node_new(1);
    t1->left->right  = node_new(3);
    t1->right->left  = node_new(5);
    t1->right->right = node_new(7);
    printf("Дерево 1: %s\n", is_balanced(t1) ? "збалансоване" : "незбалансоване");
    tree_free(t1);

    /*
     * Незбалансоване (ланцюг):
     *   1
     *    \
     *     2
     *      \
     *       3
     *        \
     *         4
     */
    Node *t2 = node_new(1);
    t2->right = node_new(2);
    t2->right->right = node_new(3);
    t2->right->right->right = node_new(4);
    printf("Дерево 2: %s\n", is_balanced(t2) ? "збалансоване" : "незбалансоване");
    tree_free(t2);

    return 0;
}
