/*
 * Завдання 17. Перевірка наявності циклу в орієнтованому графі та
 * виведення одного з циклів, якщо він є.
 *
 * Ідея алгоритму:
 *   Класичний DFS із трьома станами вершин (white/gray/black).
 *     - WHITE — ще не відвідано
 *     - GRAY  — у поточному стеку рекурсії (на шляху від кореня DFS)
 *     - BLACK — повністю опрацьовано
 *   Якщо під час обходу зустрічаємо ребро u -> v, де v має статус GRAY,
 *   то v є предком u у дереві DFS — це backedge, і ми знайшли цикл.
 *
 *   Для відновлення циклу ведемо масив parent[]. Запамʼятовуємо пару
 *   (v, u) — стартова й кінцева точки циклу — та піднімаємось від u по
 *   parent[] до v, додаючи v на початку та в кінці, аби замкнути цикл.
 *
 * Часова складність:  O(V + E).
 * Просторова складність: O(V) для color/parent + список суміжності O(V + E).
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int *adj;
    int  size;
    int  cap;
} VertexList;

typedef struct {
    int         n;
    VertexList *list;
} Graph;

static Graph *graph_new(int n) {
    Graph *g = (Graph *)malloc(sizeof(Graph));
    g->n     = n;
    g->list  = (VertexList *)calloc((size_t)n, sizeof(VertexList));
    return g;
}

static void graph_free(Graph *g) {
    for (int i = 0; i < g->n; i++) free(g->list[i].adj);
    free(g->list);
    free(g);
}

/* Орієнтоване ребро u -> v. */
static void graph_add_edge(Graph *g, int u, int v) {
    VertexList *vl = &g->list[u];
    if (vl->size == vl->cap) {
        vl->cap = vl->cap ? vl->cap * 2 : 4;
        vl->adj = (int *)realloc(vl->adj, (size_t)vl->cap * sizeof(int));
    }
    vl->adj[vl->size++] = v;
}

enum { WHITE = 0, GRAY = 1, BLACK = 2 };

static bool dfs(Graph *g, int u, int *color, int *parent,
                int *cycle_start, int *cycle_end) {
    color[u] = GRAY;
    VertexList *vl = &g->list[u];
    for (int i = 0; i < vl->size; i++) {
        int v = vl->adj[i];
        if (color[v] == WHITE) {
            parent[v] = u;
            if (dfs(g, v, color, parent, cycle_start, cycle_end)) return true;
        } else if (color[v] == GRAY) {
            /* backedge: знайдено цикл v -> ... -> u -> v */
            *cycle_start = v;
            *cycle_end   = u;
            return true;
        }
    }
    color[u] = BLACK;
    return false;
}

/*
 * Якщо є цикл, повертає true та виділяє масив *cycle_out довжиною
 * *cycle_len, у якому послідовно перелічено вершини циклу:
 * [v, ..., u, v]. Викликач повинен викликати free().
 */
static bool find_cycle(Graph *g, int **cycle_out, int *cycle_len) {
    *cycle_out = NULL;
    *cycle_len = 0;

    int *color  = (int *)calloc((size_t)g->n, sizeof(int));
    int *parent = (int *)malloc(sizeof(int) * (size_t)g->n);
    for (int i = 0; i < g->n; i++) parent[i] = -1;

    int cs = -1, ce = -1;
    bool found = false;
    for (int i = 0; i < g->n && !found; i++) {
        if (color[i] == WHITE && dfs(g, i, color, parent, &cs, &ce)) {
            found = true;
        }
    }

    if (found) {
        /* Рахуємо вершини у циклі: cs + (від ce вгору до, але не включно, cs). */
        int n_nodes = 1; /* стартова вершина cs */
        for (int x = ce; x != cs; x = parent[x]) n_nodes++;
        int len = n_nodes + 1; /* +1 для замикання cs у кінці */

        int *cycle = (int *)malloc(sizeof(int) * (size_t)len);
        cycle[len - 1] = cs;
        int idx = len - 2;
        for (int x = ce; x != cs; x = parent[x]) {
            cycle[idx--] = x;
        }
        cycle[idx] = cs;
        *cycle_out = cycle;
        *cycle_len = len;
    }
    free(color);
    free(parent);
    return found;
}

int main(void) {
    /*
     *  Граф з циклом 1 -> 2 -> 3 -> 1:
     *  0 -> 1 -> 2 -> 3 -> 4
     *           ^         |
     *           |_________|  (3 -> 1 утворює цикл)
     */
    Graph *g = graph_new(5);
    graph_add_edge(g, 0, 1);
    graph_add_edge(g, 1, 2);
    graph_add_edge(g, 2, 3);
    graph_add_edge(g, 3, 1);
    graph_add_edge(g, 3, 4);

    int *cycle;
    int len;
    if (find_cycle(g, &cycle, &len)) {
        printf("Цикл знайдено:");
        for (int i = 0; i < len; i++) {
            printf(" %d%s", cycle[i], i + 1 < len ? " ->" : "");
        }
        putchar('\n');
        free(cycle);
    } else {
        printf("Циклів немає\n");
    }
    graph_free(g);
    return 0;
}
