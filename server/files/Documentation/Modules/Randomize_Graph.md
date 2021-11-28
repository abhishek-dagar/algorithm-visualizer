# Randomize.Graph

Create a random adjacency matrix. [Usage](https://github.com/search?q=Randomize.Graph+repo%3Aalgorithm-visualizer%2Falgorithms&type=Code)

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
      <td align="right"><b>Randomize.Graph</b></td>
      <td>The graph would have <code>N</code> nodes and roughly <code>ratio</code> * 100% of all the possible edges, and the weight of each edge would be randomized by <code>randomizer</code>.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">new Randomize.Graph(int N = 5, double ratio = .3, Randomizer randomizer = new Integer())</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>directed</b></td>
      <td>The graph would be directed if <code>directed</code> is <code>true</code>.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Randomize.Graph directed(boolean directed = true)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>weighted</b></td>
      <td>The graph would be weighted if <code>weighted</code> is <code>true</code>.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Randomize.Graph weighted(boolean weighted = true)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>create</b></td>
      <td>Create a random adjacency matrix.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Object[][] create()</pre>
      </td>
    </tr>
  </tbody>
</table>