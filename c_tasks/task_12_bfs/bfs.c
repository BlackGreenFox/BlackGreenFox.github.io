/*
 * Завдання 12. Найкоротший шлях у неорієнтованому графі (BFS).
 *
 * Ідея алгоритму:
 *   BFS гарантує, що при першому досягненні вершини довжина шляху до неї
 *   мінімальна (у незваженому графі). Щоб обробити список початкових
 *   вершин, ми використовуємо багатоджерельний BFS: одночасно кладемо у
 *   чергу всі стартові вершини з нульовою відстанню, тоді поточна
 *   обробка дає найкоротший шлях від ЯКОЇ-небудь з них до кінцевої.
 *
 *   Для відновлення шляху зберігаємо масив parent[] — попередник вершини
 *   у дереві обходу. Початкові вершини мають parent == -1.
 *
 * Часова складність:  O(V + E) — кожне ребро та вершина обробляються O(1) раз.
 * Просторова складність: O(V + E) — список суміжності, черга, масив parent[].
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

/* Додає ребро в обидва напрямки (граф неорієнтований). */
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

/*
 * Шукає найкоротший шлях від будь-якої з вершин sources до dest.
 * Повертає динамічно виділений масив вершин уздовж шляху і його довжину
 * через path_len. Якщо шляху немає — повертає NULL.
 */
static int *bfs_shortest_path(Graph *g, const int *sources, int num_sources,
                              int dest, int *path_len) {
    *path_len = 0;
    int  *parent  = (int *)malloc(sizeof(int) * (size_t)g->n);
    int  *queue   = (int *)malloc(sizeof(int) * (size_t)g->n);
    bool *visited = (bool *)calloc((size_t)g->n, sizeof(bool));
    if (!parent || !queue || !visited) {
        free(parent); free(queue); free(visited);
        return NULL;
    }

    int qhead = 0, qtail = 0;
    for (int i = 0; i < num_sources; i++) {
        int s = sources[i];
        if (s < 0 || s >= g->n || visited[s]) continue;
        visited[s] = true;
        parent[s]  = -1;
        queue[qtail++] = s;
    }

    bool found = false;
    while (qhead < qtail) {
        int u = queue[qhead++];
        if (u == dest) { found = true; break; }
        VertexList *vl = &g->list[u];
        for (int i = 0; i < vl->size; i++) {
            int v = vl->adj[i];
            if (!visited[v]) {
                visited[v] = true;
                parent[v]  = u;
                queue[qtail++] = v;
            }
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

    free(parent);
    free(queue);
    free(visited);
    return result;
}

int main(void) {
    /*
     *  Граф (вершини 0..5):
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
    int *path = bfs_shortest_path(g, sources, 2, 5, &path_len);

    if (path) {
        printf("Найкоротший шлях (вершин: %d):", path_len);
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
