export function findNeighbors(graph: Map<string, string[]>, node: string): string[] {
  return graph.get(node) || [];
  // return []; // for jest testing
}

export const graph = new Map<string, string[]>([
  ["1", ["2", "3"]],
  ["2", ["1", "4", "5"]],
  ["3", ["1", "6"]],
  ["4", ["2"]],
  ["5", ["2", "6"]],
  ["6", ["3", "5"]],
]);

export function bfs(root: string): string[] {
  if(!graph.has(root)) {
    return [];
  }
  const visited = new Set<string>(); // all the visited nodes are stored here
  const queue: string[] = [root]; // the queue of nodes to visit
  const result: string[] = [];

  visited.add(root);

  while (queue.length > 0) {
    const vertex = queue.shift()!;
    result.push(vertex);
  

    // findNeighbors function to get neighbors of the current node
    const neighbors = findNeighbors(graph, vertex);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
return result;
}

// console.log(bfs("3"));
// console.log(graph);


// Same function but with a large graph for execution time 
// ---------------------------------------------------------

const largeGraph = new Map<string, string[]>();

for (let i = 0; i < 100000; i++) {
  // largeGraph.set(`${i}`, [`${i + 1}`]);
  const neighbors = []
  if(i > 0) neighbors.push(`${i - 1}`);
  if(i < 99999) neighbors.push(`${i + 1}`);
  if(i % 100 !== 0) neighbors.push(`${i + 100}`);

  largeGraph.set(`${i}`, neighbors);
}

function fsLarge(root: string): string[] {
  if(!largeGraph.has(root)) {
    return [];
  }
  const visited = new Set<string>(); // all the visited nodes are stored here
  const queue: string[] = [root]; // the queue of nodes to visit
  const result: string[] = [];

  visited.add(root);

  while (queue.length > 0) {
    const vertex = queue.shift()!;
    result.push(vertex);
  

    // Use the findNeighbors function to get neighbors of the current node
    const neighbors = findNeighbors(largeGraph, vertex);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
return result;
}

console.time("large graph bfs execution time");
console.log(fsLarge("68422"));
console.timeEnd("large graph bfs execution time");
// console.log(largeGraph);
