import { MinPriorityQueue } from "@datastructures-js/priority-queue";

export const weightedGraph = new Map<string, { node: string, weight: number }[]> ([
    ["1", [{ node: "2", weight: 1 }, { node: "3", weight: 4 }, { node: "4", weight: 2 }]],
    ["2", [{ node: "1", weight: 1 }, { node: "4", weight: 3 }, { node: "5", weight: 2 }, { node: "6", weight: 6 }]],
    ["3", [{ node: "1", weight: 4 }, { node: "7", weight: 5 }, { node: "8", weight: 2 }]],
    ["4", [{ node: "1", weight: 2 }, { node: "2", weight: 3 }, { node: "5", weight: 1 }, { node: "9", weight: 4 }]],
    ["5", [{ node: "2", weight: 2 }, { node: "4", weight: 1 }, { node: "6", weight: 3 }, { node: "10", weight: 2 }]],
    ["6", [{ node: "2", weight: 6 }, { node: "5", weight: 3 }, { node: "7", weight: 2 }]],
    ["7", [{ node: "3", weight: 5 }, { node: "6", weight: 2 }, { node: "8", weight: 1 }]],
    ["8", [{ node: "3", weight: 2 }, { node: "7", weight: 1 }, { node: "9", weight: 3 }, { node: "10", weight: 4 }]],
    ["9", [{ node: "4", weight: 4 }, { node: "8", weight: 3 }, { node: "10", weight: 2 }]],
    ["10", [{ node: "5", weight: 2 }, { node: "8", weight: 4 }, { node: "9", weight: 2 }]]
]);

export function findNeighbors(weightedGraph: Map<string, { node: string; weight: number }[]>, node: string): { node: string; weight: number }[] {
    return weightedGraph.get(node) || [];
}

export function kShortestPaths_astar(
  weightedGraph: Map<string, { node: string; weight: number }[]>,
  start: string,
  end: string,
  K: number,
): { path: string[]; distance: number }[] {
  if (K <= 0) return [];

  const priorityQueue = new MinPriorityQueue<{
    path: string[];
    totalWeight: number;
    visited: Set<string>;
    heuristic: number;
  }>((entry) => entry.totalWeight + entry.heuristic);

  const distance: { [key: string]: number } = {}; // to store the distance

  distance[start] = 0;

  const shortestPaths: { path: string[]; distance: number }[] = [];

  priorityQueue.enqueue({
    path: [start],
    totalWeight: 0,
    visited: new Set([start]),
    heuristic: 0,
  });

  while (!priorityQueue.isEmpty() && shortestPaths.length < K) {
    const current = priorityQueue.dequeue(); // dequeue the first element

    if (!current) continue; // skip if the current node is undefined

    const lastNode = current.path[current.path.length - 1];

    if (lastNode === end) {
      shortestPaths.push({ path: current.path, distance: current.totalWeight }); // add the path to the result
      continue;
    }

    for (const neighbor of findNeighbors(weightedGraph, lastNode)) {
      if (current.visited.has(neighbor.node)) continue; //  skip revisiting stations

      const newVisited = new Set(current.visited); //  create a new visited set per path
      newVisited.add(neighbor.node); //  mark station as visited for this path

      priorityQueue.enqueue({
        path: [...current.path, neighbor.node],
        totalWeight: current.totalWeight + neighbor.weight,
        heuristic: Math.abs(parseInt(end) - parseInt(neighbor.node)),
        visited: newVisited, //  store updated visited set in the queue
      });
    }
  }
  return shortestPaths;
}

console.time("A-star Yen K")
for (let i = 0; i < 100000; i++) {
  kShortestPaths_astar(weightedGraph, "1", "4", 3);
}
console.timeEnd("A-star Yen K")

const res = kShortestPaths_astar(weightedGraph, "1", "4", 3);
console.log(res);