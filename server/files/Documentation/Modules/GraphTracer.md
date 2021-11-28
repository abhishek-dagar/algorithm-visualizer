# GraphTracer

Visualize an adjacency matrix into a graph. [Usage](https://github.com/search?q=GraphTracer+repo%3Aalgorithm-visualizer%2Falgorithms&type=Code)

## Methods

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="right"><b>GraphTracer</b></td>
      <td>Create a GraphTracer object.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">new GraphTracer(String title = "GraphTracer")</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>set</b></td>
      <td>Set <code>array2d</code> to visualize.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer set(Object[][] array2d = [])</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>reset</b></td>
      <td>Reset data.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer reset()</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>delay</b></td>
      <td>Pause to show changes in all tracers.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer delay()</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>directed</b></td>
      <td>Make the graph directed.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer directed(boolean isDirected = true)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>weighted</b></td>
      <td>Make the graph weighted.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer weighted(boolean isWeighted = true)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>addNode</b></td>
      <td>Add a node.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer addNode(Object id, double weight = null, double x = 0, double y = 0, int visitedCount = 0, int selectedCount = 0)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>updateNode</b></td>
      <td>Update a node.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer updateNode(Object id, double weight = undefined, double x = undefined, double y = undefined, int visitedCount = undefined, int selectedCount = undefined)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>removeNode</b></td>
      <td>Remove a node.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer removeNode(Object id)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>addEdge</b></td>
      <td>Add an edge connecting from <code>source</code> to <code>target</code>.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer addEdge(Object source, Object target, double weight = null, int visitedCount = 0, int selectedCount = 0)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>updateEdge</b></td>
      <td>Update an edge connecting from <code>source</code> to <code>target</code>.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer updateEdge(Object source, Object target, double weight = undefined, int visitedCount = undefined, int selectedCount = undefined)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>removeEdge</b></td>
      <td>Remove an edge connecting from <code>source</code> to <code>target</code>.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer removeEdge(Object source, Object target)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>layoutCircle</b></td>
      <td>Arrange nodes on a circular layout.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer layoutCircle()</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>layoutTree</b></td>
      <td>Arrange nodes on a tree layout having <code>root</code> as its root node.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer layoutTree(Object root = 0, boolean sorted = false)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>layoutRandom</b></td>
      <td>Arrange nodes randomly.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer layoutRandom()</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>visit</b></td>
      <td>Visit <code>target</code> from <code>source</code>.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer visit(Object target, Object source = null, double weight = null)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>leave</b></td>
      <td>Return from <code>target</code> to <code>source</code>.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer leave(Object target, Object source = null, double weight = null)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>select</b></td>
      <td>Select <code>target</code> from <code>source</code>.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer select(Object target, Object source = null)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>deselect</b></td>
      <td>Stop selecting <code>target</code> from <code>source</code>.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer deselect(Object target, Object source = null)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>log</b></td>
      <td>Log graph traversals.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">GraphTracer log(LogTracer logTracer)</pre>
      </td>
    </tr>
  </tbody>
</table>