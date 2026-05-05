CC      = gcc
CFLAGS  = -std=c11 -Wall -Wextra -Wpedantic -O2

TARGETS = \
	task_11_anagrams/anagrams \
	task_12_bfs/bfs \
	task_13_dfs/dfs \
	task_14_email/email \
	task_15_permutation/permutation \
	task_16_merge/merge \
	task_17_cycle/cycle \
	task_18_bst_valid/bst_valid \
	task_19_bst_balanced/bst_balanced \
	task_20_freq_sort/freq_sort

.PHONY: all clean test
all: $(TARGETS)

%: %.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	rm -f $(TARGETS) task_14_email/out.txt

test: all
	@echo "===== Завдання 11: Анаграми ====="
	./task_11_anagrams/anagrams task_11_anagrams/words.txt
	@echo "===== Завдання 12: BFS ====="
	./task_12_bfs/bfs
	@echo "===== Завдання 13: DFS ====="
	./task_13_dfs/dfs
	@echo "===== Завдання 14: EmailAddress ====="
	@printf "bob@example.com\nalice@example.com\ncarol@aaa.com\nzed@example.com\n" \
		| ./task_14_email/email task_14_email/out.txt
	@echo "Відсортовані адреси у task_14_email/out.txt:"; cat task_14_email/out.txt
	@echo "===== Завдання 15: Перестановка ====="
	./task_15_permutation/permutation task_15_permutation/strings.txt
	@echo "===== Завдання 16: Обʼєднання масивів ====="
	./task_16_merge/merge
	@echo "===== Завдання 17: Цикл у графі ====="
	./task_17_cycle/cycle
	@echo "===== Завдання 18: Валідне BST ====="
	./task_18_bst_valid/bst_valid
	@echo "===== Завдання 19: Збалансоване BST ====="
	./task_19_bst_balanced/bst_balanced
	@echo "===== Завдання 20: Частотне сортування ====="
	./task_20_freq_sort/freq_sort
