import { Route, Routes } from "react-router-dom";
import CreateTaskScreen from "../components/CreateTaskScreen";
import EditTaskScreen from "../components/EditTaskScreen";
import SettingsScreen from "../components/SettingsScreen";
import TaskDetailsScreen from "../components/TaskDetailsScreen";
import TaskListScreen from "../components/TaskListScreen";
import { useApp } from "../contexts/AppContext";

export default function AppRoutes() {
  const { isDark } = useApp();

  return (
    <div className={isDark ? 'dark' : ''}>
      <Routes>
        <Route path="/" element={<TaskListScreen />} />
        <Route path="/create" element={<CreateTaskScreen />} />
        <Route path="/task/:id" element={<TaskDetailsScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/edit/:id" element={<EditTaskScreen />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}