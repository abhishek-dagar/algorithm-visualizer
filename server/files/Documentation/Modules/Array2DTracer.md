# Array2DTracer

Visualize a two-dimensional array into a table. [Usage](https://github.com/search?q=Array2DTracer+repo%3Aalgorithm-visualizer%2Falgorithms&type=Code)

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
      <td align="right"><b>Array2DTracer</b></td>
      <td>Create an Array2DTracer object.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">new Array2DTracer(String title = "Array2DTracer")</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>set</b></td>
      <td>Set <code>array2d</code> to visualize.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Array2DTracer set(Object[][] array2d = [])</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>reset</b></td>
      <td>Reset data.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Array2DTracer reset()</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>delay</b></td>
      <td>Pause to show changes in all tracers.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Array2DTracer delay()</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>patch</b></td>
      <td>Notify that the value at (<code>x</code>, <code>y</code>) has been changed to <code>v</code>.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Array2DTracer patch(int x, int y, Object v)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>depatch</b></td>
      <td>Stop notifying that the value at (<code>x</code>, <code>y</code>) has been changed.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Array2DTracer depatch(int x, int y)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>select</b></td>
      <td>Select (<code>x</code>, <code>y</code>).</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Array2DTracer select(int x, int y)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>select</b></td>
      <td>Select from (<code>sx</code>, <code>sy</code>) to (<code>ex</code>, <code>ey</code>).</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Array2DTracer select(int sx, int sy, int ex, int ey)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>selectRow</b></td>
      <td>Select from (<code>x</code>, <code>sy</code>) to (<code>x</code>, <code>ey</code>).</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Array2DTracer selectRow(int x, int sy, int ey)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>selectCol</b></td>
      <td>Select from (<code>sx</code>, <code>y</code>) to (<code>ex</code>, <code>y</code>).</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Array2DTracer selectCol(int y, int sx, int ex)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>deselect</b></td>
      <td>Stop selecting (<code>x</code>, <code>y</code>).</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Array2DTracer deselect(int x, int y)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>deselect</b></td>
      <td>Stop selecting from (<code>sx</code>, <code>sy</code>) to (<code>ex</code>, <code>ey</code>).</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Array2DTracer deselect(int sx, int sy, int ex, int ey)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>deselectRow</b></td>
      <td>Stop selecting from (<code>x</code>, <code>sy</code>) to (<code>x</code>, <code>ey</code>).</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Array2DTracer deselectRow(int x, int sy, int ey)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>deselectCol</b></td>
      <td>Stop selecting from (<code>sx</code>, <code>y</code>) to (<code>ex</code>, <code>y</code>).</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">Array2DTracer deselectCol(int y, int sx, int ex)</pre>
      </td>
    </tr>
  </tbody>
</table>