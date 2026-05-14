/**
 * ╔══════════════════════════════════════╗
 * ║  ✅ EDITABLE - EDIT THIS FILE ✅      ║
 * ╚══════════════════════════════════════╝
 */

import { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

export default function Lab7_TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Train with sword", completed: true, priority: "high" },
    { id: 2, title: "Buy healing potions", completed: false, priority: "medium" },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // ─────────────────────────────────────────────
  // TODO 1: Derived State - Total & Statistics
  // Create the following derived values:
  // - totalTasks
  // - completedTasks
  // - completionPercentage (rounded to nearest integer)
  // ─────────────────────────────────────────────

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionPercentage = totalTasks === 0 ? 0 : (Math.round(completedTasks / totalTasks) * 100);

  const addTask = () => {
    // TODO 2: Add new task
    // Only add if newTaskTitle is not empty
    // Reset input after adding
    if (newTaskTitle.trim() === "") return;

    const newTask: Task = {
      id: 3,
      title: newTaskTitle.trim(),
      completed: false,
      priority: "low"
    }

    setTasks((prev) => [...prev, newTask])

    setNewTaskTitle("");
  };

  const toggleComplete = (id: number) => {
    // TODO 3: Toggle completed status (immutable update)
    setTasks((prev) => prev.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))
  };

  const deleteTask = (id: number) => {
    // TODO 4: Delete task
    setTasks(prev => prev.filter(task => task.id !== id))
  };

  const changePriority = (id: number, newPriority: "low" | "medium" | "high") => {
    // TODO 5: Update priority of a task
    setTasks((prev) => prev.map((task) => task.id === id ? { ...task, priority: newPriority } : task))
  };

  // TODO 6: Filtered Tasks (derived)
  // Return tasks based on current filter ("all", "active", or "completed")
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed;
    return true;
  })

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>🏴‍☠️ Hero's Quest Log</h2>

      {/* Add new task */}
      <div style={{ marginBottom: "20px" }}>
        <input
          value={newTaskTitle}
          placeholder="New quest..."
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{ marginRight: "8px", padding: "8px" }}
        />
        <button onClick={addTask}>Add Quest</button>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: "16px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* Stats */}
      <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
        {/* TODO 1: Display your derived stats here */}
        <p>Total Quests: {totalTasks} | Completed: {completedTasks} | Progress: {completionPercentage}%</p>
      </div>

      {/* Task List */}
      <div>
        {/* TODO 7: Render filtered tasks here */}
        {/* Each task should show:
            - Checkbox to toggle complete
            - Title with strikethrough if completed
            - Priority buttons (Low / Medium / High)
            - Delete button
        */}

        {
          filteredTasks.length === 0 ? (<p>No tasks match your current filter.</p>) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                style={{
                  padding: "12px",
                  marginBottom: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  backgroundColor: task.completed ? "#f0f0f0" : "#fff",
                }}>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                  />

                  {/* Task Title */}
                  <span
                    style={{
                      flex: 1,
                      textDecoration: task.completed ? "line-through" : "none",
                      color: task.completed ? "#888" : "#000",
                    }}>
                    {task.title}
                  </span>

                  {/* Priority Buttons */}
                  <div>
                    <button
                      onClick={() => changePriority(task.id, "low")}
                      style={{
                        marginRight: "4px",
                        backgroundColor: task.priority === "low" ? "#4ade80" : "#e5e5e5",
                      }}>Low</button>
                    <button
                      onClick={() => changePriority(task.id, "medium")}
                      style={{
                        marginRight: "4px",
                        backgroundColor: task.priority === "high" ? "#f87171" : "#e5e5e5"
                      }}>Med</button>
                    <button
                      onClick={() => changePriority(task.id, "high")}
                      style={{
                        backgroundColor: task.priority === "high" ? "#f87171" : "#e5e5e5",
                      }}>High</button>

                    <button
                      onClick={() => deleteTask(task.id)}
                      style={{
                        color: "red", 
                        marginLeft: "8px"
                      }}>Delete</button>
                  </div>

                </div>

              </div>
            ))
          )
        }

      </div>

      {tasks.length === 0 && <p>No quests yet. Add one above!</p>}
    </div>
  );
}