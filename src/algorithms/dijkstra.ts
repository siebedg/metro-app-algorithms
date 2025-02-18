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

export const denseGraph = new Map<string, { node: string, weight: number }[]> ([
    // 🤖 
    // this graph is heavily connected
    ["1", [{ node: "2", weight: 1 }, { node: "3", weight: 2 }, { node: "4", weight: 2 }, { node: "5", weight: 3 }]],
    ["2", [{ node: "1", weight: 1 }, { node: "6", weight: 2 }, { node: "7", weight: 4 }, { node: "8", weight: 5 }]],
    ["3", [{ node: "1", weight: 2 }, { node: "9", weight: 3 }, { node: "10", weight: 1 }, { node: "11", weight: 2 }]],
    ["4", [{ node: "1", weight: 2 }, { node: "12", weight: 4 }, { node: "13", weight: 3 }]],
    ["5", [{ node: "1", weight: 3 }, { node: "14", weight: 1 }, { node: "15", weight: 2 }]],
    ["6", [{ node: "2", weight: 2 }, { node: "16", weight: 5 }, { node: "17", weight: 3 }]],
    ["7", [{ node: "2", weight: 4 }, { node: "18", weight: 2 }, { node: "19", weight: 1 }]],
    ["8", [{ node: "2", weight: 5 }, { node: "20", weight: 3 }]],
    ["9", [{ node: "3", weight: 3 }, { node: "10", weight: 2 }]],
    ["10", [{ node: "3", weight: 1 }, { node: "11", weight: 1 }, { node: "20", weight: 4 }]],
    ["11", [{ node: "3", weight: 2 }, { node: "10", weight: 1 }]],
    ["12", [{ node: "4", weight: 4 }]],
    ["13", [{ node: "4", weight: 3 }]],
    ["14", [{ node: "5", weight: 1 }]],
    ["15", [{ node: "5", weight: 2 }]],
    ["16", [{ node: "6", weight: 5 }]],
    ["17", [{ node: "6", weight: 3 }]],
    ["18", [{ node: "7", weight: 2 }]],
    ["19", [{ node: "7", weight: 1 }]],
    ["20", [{ node: "8", weight: 3 }, { node: "10", weight: 4 }]]
]);

export function generateSparseGraph(size: number): Map<string, { node: string, weight: number }[]> {
    // 🤖 
    // this graph has fewer connections
    const graph = new Map<string, { node: string, weight: number }[]>();

    for (let i = 1; i <= size; i++) {
        const neighbors = [];
        for (let j = 1; j <= 3; j++) { // Each node connects to only 3 random others
            const randomNode = Math.floor(Math.random() * size) + 1;
            if (randomNode !== i) {
                neighbors.push({ node: randomNode.toString(), weight: Math.floor(Math.random() * 10) + 1 });
            }
        }
        graph.set(i.toString(), neighbors);
    }

    return graph;
}

export const sparseGraph = generateSparseGraph(100);

export function findNeighbors(weightedGraph: Map<string, { node: string; weight: number }[]>, node: string): { node: string; weight: number }[] {
    return weightedGraph.get(node) || [];
}

export function dijkstra(
  weightedGraph: Map<string, { node: string; weight: number }[]>,
  start: string,
  end: string
): { path: string[]; distance: number } {

  const priorityQueue= new MinPriorityQueue<{ node: string, weight: number}>(
   (entry) => entry.weight
  );
  
  const came_from: { [key: string]: string | null } = {}; // to store the path
  const distance: { [key: string]: number } = {}; // to store the distance

  came_from[start] = null;
  distance[start] = 0;

  priorityQueue.enqueue({ node: start, weight: 0 });

  while (!priorityQueue.isEmpty()) {
    const current = priorityQueue.dequeue(); // dequeue the first element

    if (!current) continue; // skip if the current node is undefined
    if (current.node === end) break; // stop the loop if we reach the end node

    // get the neighbors of the current node
    for (const neighbor of findNeighbors(weightedGraph, current.node)) {

      const newDistance = (distance[current.node] ?? Infinity) + neighbor.weight;

      if (!(neighbor.node in distance) || newDistance < distance[neighbor.node]) {
        distance[neighbor.node] = newDistance;
        came_from[neighbor.node] = current.node;

        priorityQueue.enqueue({ node: neighbor.node, weight: newDistance });
      }
    }
  }

  // reconstruct the path
  const path: string[] = [];
  let currentNode: string | null = end;

    while (currentNode) {
        path.unshift(currentNode);
        currentNode = came_from[currentNode];
    }

  return { path, distance: distance[end] ?? Infinity};
}

console.time("test weightedGrapg 4 times")
for (let i = 0; i < 20; i++) {
    dijkstra(weightedGraph, "1", "4");
}
console.timeEnd("test weightedGrapg 4 times")


// weightedGraph
console.time("dijkstra performance testing: SIMPLE GRAPH");
    for (let i = 0; i < 100000; i++) {
        dijkstra(weightedGraph, "1", "10");
    }
console.timeEnd("dijkstra performance testing: SIMPLE GRAPH");

// denseGraph
console.time("dijkstra performance testing: DENSE GRAPH");
    for (let i = 0; i < 100000; i++) {
        dijkstra(denseGraph, "1", "20");
    }
console.timeEnd("dijkstra performance testing: DENSE GRAPH");

// sparseGraph
console.time("dijkstra performance testing: SPARSE GRAPH");
    for (let i = 0; i < 10000; i++) {
        dijkstra(sparseGraph, "1", "500");
    }
console.timeEnd("dijkstra performance testing: SPARSE GRAPH");


