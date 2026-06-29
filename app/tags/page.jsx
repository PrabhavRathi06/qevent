"use client";

import Tag from "@/components/Tag";
import { useEffect, useState } from "react";

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/events");
        const events = await res.json();
        const allTags = events.flatMap((event) => event.tags || []);
        const uniqueTags = [...new Set(allTags)];
        setTags(uniqueTags);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTags();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-xl">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent">
        Tags
      </h1>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <Tag text={tag} key={tag} />
        ))}
      </div>
    </div>
  );
}
