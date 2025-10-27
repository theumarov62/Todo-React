import { useState, useEffect } from "react";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const Submit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTodo = Object.fromEntries(formData.entries());

    if (!newTodo.title?.trim() || !newTodo.description?.trim()) return;

    setTodos((prev) => [...prev, newTodo]);
    e.target.reset();
  };

  // Edit Modal Open
  const Edit = (index) => {
    setEditIndex(index);
    setEditData(todos[index]);
  };

  // Edit Save
  const EditSave = () => {
    const updated = [...todos];
    updated[editIndex] = editData;
    setTodos(updated);
    setEditIndex(null);
  };

  // Delete Modal Open
  const Delete = (index) => {
    setDeleteIndex(index);
  };

  // Delete Save
  const DeleteConfirm = () => {
    setTodos((prev) => prev.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  return (
    <section>
      <div className="container ml-auto mr-auto pt-5">
        <h1 className="text-[40px] text-center">Todo App</h1>

        {/* FORM */}
        <form
          className="flex flex-col items-center justify-center gap-[15px]"
          onSubmit={Submit}
        >
          <div className="flex flex-col items-start justify-center gap-[10px]">
            <input
              type="text"
              className="w-[300px] focus:outline-none pl-[10px] border-[2px] border-black rounded-[4px] h-[40px]"
              placeholder="Todo Nomini kiriting"
              name="title"
            />
            <textarea
              placeholder="Todo uchun izoh kiriting"
              className="resize-none w-[300px] h-[50px] border-[2px] border-black rounded-[4px] pl-[5px]"
              name="description"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-[140px] h-[30px] border-[2px] border-gray-700 cursor-pointer rounded-[4px] transition duration-300 active:text-white active:bg-black"
          >
            Qo‘shish
          </button>
        </form>

        {/* Todo List */}
        <div className="mt-6 max-w-md mx-auto">
          <ul className="space-y-3">
            {todos.map((todo, i) => (
              <li
                key={i}
                className="border p-3 rounded flex justify-between items-start"
              >
                <div>
                  <h2 className="font-semibold">{todo.title}</h2>
                  <p className="text-gray-700">{todo.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => Edit(i)}
                    className="text-blue-600 border cursor-pointer border-blue-600 px-2 rounded hover:bg-blue-600 hover:text-white transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => Delete(i)}
                    className="text-red-600 border cursor-pointer border-red-600 px-2 rounded hover:bg-red-600 hover:text-white transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Edit Modal */}
          {editIndex !== null && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-white rounded-xl p-5 w-[320px] shadow-lg">
                <h2 className="text-lg font-bold mb-3">Tahrirlash</h2>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="border w-full p-2 mb-2 rounded"
                />
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="border w-full p-2 rounded resize-none"
                ></textarea>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setEditIndex(null)}
                    className="border px-3 py-1 rounded"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={EditSave}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Saqlash
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Modal */}
          {deleteIndex !== null && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-white rounded-xl p-5 w-[300px] text-center shadow-lg">
                <h2 className="text-lg font-bold mb-4">Rostan o‘chirasizmi?</h2>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setDeleteIndex(null)}
                    className="border px-4 py-1 rounded"
                  >
                    Yo‘q
                  </button>
                  <button
                    onClick={DeleteConfirm}
                    className="bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Ha
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
