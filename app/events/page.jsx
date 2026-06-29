"use client";

import EventCard from "@/components/EventCard";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function EventsContent() {
  const searchParams = useSearchParams();
  const artistFilter = searchParams.get("artist");
  const tagFilter = searchParams.get("tag");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  let filteredEvents = events;

  if (artistFilter) {
    filteredEvents = events.filter(
      (event) => event.artist === artistFilter
    );
  }

  if (tagFilter) {
    filteredEvents = events.filter(
      (event) => event.tags && event.tags.includes(tagFilter)
    );
  }

  if (loading) {
    return <div className="p-6 text-center text-xl">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent">
        {artistFilter
          ? `Events by ${artistFilter}`
          : tagFilter
          ? `Events tagged "${tagFilter}"`
          : "Events"}
      </h1>
      <div className="flex flex-wrap justify-center">
        {filteredEvents.map((eventData) => (
          <EventCard eventData={eventData} key={eventData.id} />
        ))}
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-xl">Loading...</div>}>
      <EventsContent />
    </Suspense>
  );
}
