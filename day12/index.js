const processTextToArray = require('../processTextToArray');

// number of paths through cave system
// lowercase elements are visited only once
// uppercase elements can be visited multiple times

function numPaths(edges, revisit = false) {
  // create adjacency list
  const graph = createGraph(edges);

  const paths = new Set();

  let count = 0;

  for (let i = 0; i < graph.start.length; i++) {
    count += explorePath(graph.start[i], graph, paths);
  }

  // console.log('paths', paths);
  return count;
}

function explorePath(current, graph, paths, visited = {}, path = 'start', visitedSmallMax = false) {
  // upon reaching "end" return 1
  if (current === 'end') {
    path += '-' + current;
    paths.add(path);
    return 1;
  }

  if (current === 'start') return 0;
  // base case: if visited & lowercase, return 0
  if (visited.hasOwnProperty(current) && !isUpperCase(current)) {
    // if no double, trigger flag
    if (!visitedSmallMax) visitedSmallMax = true
    // if double, return 0
    else return 0;
  }

  // add to visited
  // increment visited count
  if (!visited.hasOwnProperty(current)) visited[current] = 1
  else visited[current] += 1;

  let pathsNum = 0;
  // iterate through list & find paths through
  for (let i = 0; i < graph[current].length; i++) {
    pathsNum += explorePath(graph[current][i], graph, paths, { ... visited }, path + '-' + current, visitedSmallMax);
  }
  
  // console.log(visited);
  return pathsNum;
}

// creates bidirectional graph, both ends connected
function createGraph (edges) {
  const graph = {};

  // iterate through edges
  for (const edge of edges) {
    // console.log(edge)
    const [a, b] = edge;

    if (graph[a] === undefined) {
      graph[a] = [];
    } 
    
    if (graph[b] === undefined) {
      graph[b] = [];
    }

    graph[a].push(b);
    graph[b].push(a);
  }

  return graph;
}

// tells whether string is uppercase
function isUpperCase(char) {
  if (char.toUpperCase() === char) {
    return true;
  } else {
    return false;
  }
}

// split elements into tuples
const smallSample = processTextToArray('day12/smallSample.txt').map(el => el.split('-'));
// console.log(smallSample);
console.log('small - 10 -  36', numPaths(smallSample));

const sampleData = processTextToArray('day12/sampleData.txt').map(el => el.split('-'));
// console.log(sampleData);
console.log('sample - 19 - 103', numPaths(sampleData));

const largeSample = processTextToArray('day12/largeSample.txt').map(el => el.split('-'));
// console.log(largeSample);
console.log('large - 226 - 3509', numPaths(largeSample));

const data = processTextToArray('day12/data.txt').map(el => el.split('-'));
// console.log(data);
console.log('data - 3713 - 91292', numPaths(data));
