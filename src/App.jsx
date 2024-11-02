import { createSignal, createEffect, For, Show } from "solid-js";
import { createStore } from 'solid-js/store';

function App() {
  const [title, setTitle] = createSignal('');
  const [tasks, setTasks] = createStore({
    taskCount: 0,
    task: []
  });

  let TitleInputRef;

  createEffect(() => {
    setTasks("taskCount", tasks.task.length);
  });

  const appendTask = (event) => {
    event.preventDefault();
    setTasks("task", tasks.task.length, { id: tasks.task.length, title: title(), checked: false });
    TitleInputRef.value = '';
  };

  const checkTask = (id) => {
    setTasks("task", [id], "checked", true);
  }

  const uncheckTask = (id) => {
    setTasks("task", [id], "checked", false);
  }

  return (
    <div class="flex flex-col gap-4 p-8">
      <form onSubmit={appendTask} class="flex flex-row gap-4">
        <input ref={TitleInputRef} type="text" placeholder="Add Task"
          onInput={(event) => setTitle(() => event.currentTarget.value)}
          class="flex-1 border border-indigo-200 p-2 bg-indigo-50 text-indigo-800 rounded-md" />

        <button type="submit" onClick={appendTask} class="shrink-0 w-12 h-12 border border-indigo-200 rounded-md bg-indigo-50 text-indigo-800 hover:bg-indigo-200 duration-200">Add</button>
      </form>

      <table>
        <For each={tasks.task}>
          {(task, index) => (
            <tr class="flex flex-row gap-2">
              <td class="w-max">{index() + 1}</td>
              <td class={"flex-1 " + (task?.checked === true ? "line-through" : "")}>{task.title}</td>
              <td class="w-max *:underline">
                <Show when={!task?.checked}>
                  <button onClick={() => checkTask(index())}>Checked</button>
                </Show>
                <Show when={task.checked}>
                  <button onClick={() => uncheckTask(index())}>Uncheck</button>
                </Show>
              </td>
            </tr>
          )}
        </For>
      </table>
    </div>
  );
}

export default App;
