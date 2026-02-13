const API = "http://127.0.0.1:5000/api";

export const registerUser = (data: any) =>
  fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const loginUser = (data: any) =>
  fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const getSkills = () =>
  fetch(`${API}/skills`).then(res => res.json());

export const getLeaderboard = () =>
  fetch(`${API}/leaderboard`).then(res => res.json());

export const addTransaction = (data: any) =>
  fetch(`${API}/transaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const getTransactions = (email: string) =>
  fetch(`${API}/transactions/${email}`).then(res => res.json());

export const askAI = (query: string) =>
  fetch(`${API}/ai-chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  }).then(res => res.json());
