# ChartTracer

Visualize a one-dimensional array into a bar chart. [Usage](https://github.com/search?q=ChartTracer+repo%3Aalgorithm-visualizer%2Falgorithms&type=Code)

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
      <td align="right"><b>ChartTracer</b></td>
      <td>Create a ChartTracer object.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">new ChartTracer(String title = "ChartTracer")</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>set</b></td>
      <td>Set <code>array1d</code> to visualize.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">ChartTracer set(Object[] array1d = [])</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>reset</b></td>
      <td>Reset data.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">ChartTracer reset()</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>delay</b></td>
      <td>Pause to show changes in all tracers.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">ChartTracer delay()</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>patch</b></td>
      <td>Notify that the value at (<code>x</code>) has been changed to <code>v</code>.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">ChartTracer patch(int x, Object v)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>depatch</b></td>
      <td>Stop notifying that the value at (<code>x</code>) has been changed.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">ChartTracer depatch(int x)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>select</b></td>
      <td>Select (<code>x</code>).</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">ChartTracer select(int x)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>select</b></td>
      <td>Select from (<code>sx</code>) to (<code>ex</code>).</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">ChartTracer select(int sx, int ex)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>deselect</b></td>
      <td>Stop selecting (<code>x</code>).</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">ChartTracer deselect(int x)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>deselect</b></td>
      <td>Stop selecting from (<code>sx</code>) to (<code>ex</code>).</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">ChartTracer deselect(int sx, int ex)</pre>
      </td>
    </tr>
    <tr>
      <td align="right"><b>chart</b></td>
      <td>Synchronize data with <code>chartTracer</code>.</td>
    </tr>
    <tr>
      <td class={code} colspan="2">
        <pre lang="java">ChartTracer chart(ChartTracer chartTracer)</pre>
      </td>
    </tr>
  </tbody>
</table>