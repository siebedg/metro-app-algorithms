import { MinPriorityQueue } from "@datastructures-js/priority-queue";

export function dijkstraWithTransfers(
  weightedGraph: Map<string, { node: string; weight: number; line: string }[]>,
  start: string,
  end: string
): { path: string[]; distance: number; transfers: number } {

  const priorityQueue = new MinPriorityQueue<{ node: string, weight: number, transfers: number, line: string }>(
    (entry) => entry.weight * 100 + entry.transfers // Prioritize time, but consider transfers
  );

  const came_from: { [key: string]: { node: string | null; line: string | null } } = {}; // Tracks path with line info
  const distance: { [key: string]: number } = {}; // Tracks shortest travel time
  const transfers: { [key: string]: number } = {}; // Tracks transfer count

  for (const key of weightedGraph.keys()) {
    distance[key] = Infinity;
    transfers[key] = Infinity;
  }
  distance[start] = 0;
  transfers[start] = 0;
  came_from[start] = { node: null, line: null };

  priorityQueue.enqueue({ node: start, weight: 0, transfers: 0, line: "" });

  while (!priorityQueue.isEmpty()) {
    const current = priorityQueue.dequeue(); // Get the node with the lowest cost

    if (!current) continue; 
    if (current.node === end) break; // Stop if we reach the destination

    for (const neighbor of weightedGraph.get(current.node) || []) {
      const newDistance = distance[current.node] + neighbor.weight;
      const newTransfers = current.line && current.line !== neighbor.line ? transfers[current.node] + 1 : transfers[current.node];

      if (
        newDistance < distance[neighbor.node] || // If this route is faster
        (newDistance === distance[neighbor.node] && newTransfers < transfers[neighbor.node]) // Or same time but fewer transfers
      ) {
        distance[neighbor.node] = newDistance;
        transfers[neighbor.node] = newTransfers;
        came_from[neighbor.node] = { node: current.node, line: neighbor.line };

        priorityQueue.enqueue({ node: neighbor.node, weight: newDistance, transfers: newTransfers, line: neighbor.line });
      }
    }
  }

  // Reconstruct the path
  if (distance[end] === Infinity) return { path: [], distance: Infinity, transfers: Infinity }; // No path found

  const path: string[] = [];
  let currentNode: string | null = end;

  while (currentNode) {
    path.unshift(currentNode);
    currentNode = came_from[currentNode]?.node || null;
  }

  return { path, distance: distance[end], transfers: transfers[end] };
}
