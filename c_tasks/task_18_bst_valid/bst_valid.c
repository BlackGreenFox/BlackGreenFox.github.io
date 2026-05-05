/*
 * Завдання 18. Перевірка, чи є бінарне дерево коректним BST.
 *
 * Ідея алгоритму:
 *   Не достатньо перевіряти лише локальну умову (left.value < node.value <
 *   right.value), бо вона не виключає, наприклад, ліве піддерево, у якому
 *   глибше є вершина більша за корінь. Тому йдемо рекурсивно і проносимо
 *   допустимий діапазон (min_excl, max_excl): корінь повинен суворо
 *   потрапити в діапазон, ліве піддерево має знаходитись у (min_excl,
 *   node.value), а праве — у (node.value, max_excl).
 *
 *   Початковий діапазон — (-∞, +∞), для чого використовуємо long long
 *   межі (LLONG_MIN/LLONG_MAX).
 *
 * Часова складність:  O(N) — кожна вершина відвідується один раз.
 * Просторова складність: O(H) — глибина рекурсії дорівнює висоті дерева
 *                         (у найгіршому випадку O(N) для дерева-ланцюга).
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <limits.h>

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

static bool valid_helper(Node *n, long long min_excl, long long max_excl) {
    if (!n) return true;
    long long v = (long long)n->value;
    if (v <= min_excl || v >= max_excl) return false;
    return valid_helper(n->left,  min_excl, v) &&
           valid_helper(n->right, v,        max_excl);
}

static bool is_valid_bst(Node *root) {
    return valid_helper(root, LLONG_MIN, LLONG_MAX);
}

int main(void) {
    /*
     * Коректний BST:
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
    printf("Дерево 1: %s\n", is_valid_bst(t1) ? "коректний BST" : "не BST");
    tree_free(t1);

    /*
     * Некоректний BST (вершина 3 у правому піддереві кореня 4):
     *        4
     *       / \
     *      2   6
     *         /\
     *        3  7   <- 3 < 4, але знаходиться у правому піддереві
     */
    Node *t2 = node_new(4);
    t2->left = node_new(2);
    t2->right = node_new(6);
    t2->right->left  = node_new(3);
    t2->right->right = node_new(7);
    printf("Дерево 2: %s\n", is_valid_bst(t2) ? "коректний BST" : "не BST");
    tree_free(t2);

    return 0;
}
