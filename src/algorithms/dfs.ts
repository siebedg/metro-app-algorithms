export function findNeighbors(graph: Map<string, string[]>, node: string): string[] {
  return graph.get(node) || [];
}

export const graph = new Map<string, string[]>([
  ["1", ["2", "3"]],
  ["2", ["1", "4", "5"]],
  ["3", ["1", "6"]],
  ["4", ["2"]],
  ["5", ["2", "6"]],
  ["6", ["3", "5"]],
]);

export function dfs(root: string): string[] {
  if(!graph.has(root)) {
    return [];
  }
  const visited = new Set<string>(); // all the visited nodes are stored here
  const stack: string[] = [root]; // the stack of nodes 
  const result: string[] = [];

  visited.add(root);

  while (stack.length > 0) {
    const vertex = stack.pop()!;
    result.push(vertex);
  

    // findNeighbors function to get neighbors of the current node
    const neighbors = findNeighbors(graph, vertex);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        stack.push(neighbor);
      }
    }
  }
return result;
}