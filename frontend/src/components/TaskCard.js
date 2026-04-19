export default function TaskCard({ task }) {
  return (
    <div className="bg-gray-800 p-4 rounded mb-2">
      <h2 className="text-lg">{task.title}</h2>
      <p className="text-sm text-gray-400">{task.description}</p>
    </div>
  );
}