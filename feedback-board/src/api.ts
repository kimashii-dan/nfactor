import type { Feedback } from "./types";

const BASE_API = import.meta.env.VITE_API_BASE_URL!

// Convert backend snake_case to frontend camelCase
function toCamel(obj: any): Feedback {
  return {
    id: obj.id,
    title: obj.title,
    description: obj.description,
    category: obj.category,
    upvotes: obj.upvotes,
    downvotes: obj.downvotes,
    createdAt: obj.created_at,
    updatedAt: obj.updated_at,
  };
}

async function getFeedbacks() {
  const res = await fetch(`${BASE_API}/feedbacks/`);
  const data = await res.json();
  return data.map(toCamel);
}

async function getFeedback(id: number) {
  const res = await fetch(`${BASE_API}/feedbacks/${id}`);
  return toCamel(await res.json());
}

async function createFeedback(feedback: Omit<Feedback, "id" | "createdAt" | "updatedAt">) {
  const res = await fetch(`${BASE_API}/feedbacks/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  });
  return toCamel(await res.json());
}

// PATCH is used for all updates, including upvote/downvote
async function updateFeedback(id: number, feedback: Partial<Feedback>) {
  const res = await fetch(`${BASE_API}/feedbacks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  });
  return toCamel(await res.json());
}

async function deleteFeedback(id: number) {
  const res = await fetch(`${BASE_API}/feedbacks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Delete failed');
  return { ok: true };
}

export default { getFeedbacks, getFeedback, createFeedback, updateFeedback, deleteFeedback };