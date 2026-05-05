/*
 * Завдання 13. Будь-який шлях у неорієнтованому графі (DFS).
 *
 * Ідея алгоритму:
 *   DFS рекурсивно занурюється в сусідів поточної вершини, поки не
 *   досягне кінцевої. На відміну від BFS, тут не гарантується найкоротший
 *   шлях — повертається будь-який знайдений. Для відновлення шляху ведемо
 *   масив parent[]. Стартуємо DFS з кожної з джерельних вершин по черзі;
 *   як тільки дотягнулися до dest — фіксуємо результат.
 *
 * Часова складність:  O(V + E) — у найгіршому випадку обходимо весь граф.
 * Просторова складність: O(V) для visited і parent + O(V) для стека рекурсії.
 *                         Список суміжності — O(V + E).
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
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

static void graph_add_edge(Graph *g, int u, int v) {
    for (int dir = 0; dir < 2; dir++) {
        int a = dir ? v : u;
        int b = dir ? u : v;
        VertexList *vl = &g->list[a];
        if (vl->size == vl->cap) {
            vl->cap = vl->cap ? vl->cap * 2 : 4;
            vl->adj = (int *)realloc(vl->adj, (size_t)vl->cap * sizeof(int));
        }
        vl->adj[vl->size++] = b;
    }
}

/* Рекурсивний DFS. Повертає true, якщо досяг dest. */
static bool dfs_visit(Graph *g, int u, int dest, bool *visited, int *parent) {
    visited[u] = true;
    if (u == dest) return true;
    VertexList *vl = &g->list[u];
    for (int i = 0; i < vl->size; i++) {
        int v = vl->adj[i];
        if (!visited[v]) {
            parent[v] = u;
            if (dfs_visit(g, v, dest, visited, parent)) return true;
        }
    }
    return false;
}

/*
 * Шукає будь-який шлях від однієї з sources до dest.
 * Повертає масив вершин уздовж шляху або NULL, якщо шляху немає.
 */
static int *dfs_find_path(Graph *g, const int *sources, int num_sources,
                          int dest, int *path_len) {
    *path_len = 0;
    bool *visited = (bool *)calloc((size_t)g->n, sizeof(bool));
    int  *parent  = (int *)malloc(sizeof(int) * (size_t)g->n);
    bool found = false;

    for (int i = 0; i < num_sources && !found; i++) {
        int s = sources[i];
        if (s < 0 || s >= g->n || visited[s]) continue;
        parent[s] = -1;
        if (dfs_visit(g, s, dest, visited, parent)) {
            found = true;
        }
    }

    int *result = NULL;
    if (found) {
        int len = 0;
        for (int v = dest; v != -1; v = parent[v]) len++;
        result = (int *)malloc(sizeof(int) * (size_t)len);
        int idx = len;
        for (int v = dest; v != -1; v = parent[v]) result[--idx] = v;
        *path_len = len;
    }
    free(visited);
    free(parent);
    return result;
}

int main(void) {
    /*
     *      0 --- 1
     *      |     |
     *      2     3
     *      |     |
     *      4 --- 5
     */
    Graph *g = graph_new(6);
    graph_add_edge(g, 0, 1);
    graph_add_edge(g, 0, 2);
    graph_add_edge(g, 1, 3);
    graph_add_edge(g, 2, 4);
    graph_add_edge(g, 3, 5);
    graph_add_edge(g, 4, 5);

    int sources[] = {0, 2};
    int path_len;
    int *path = dfs_find_path(g, sources, 2, 5, &path_len);

    if (path) {
        printf("DFS шлях (вершин: %d):", path_len);
        for (int i = 0; i < path_len; i++) {
            printf(" %d%s", path[i], i + 1 < path_len ? " ->" : "");
        }
        putchar('\n');
        free(path);
    } else {
        printf("Шлях не знайдено\n");
    }

    graph_free(g);
    return 0;
}
