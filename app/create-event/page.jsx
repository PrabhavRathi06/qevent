"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/events");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-6 text-center text-xl">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent">
        Create Event
      </h1>
      <p className="text-lg">Welcome, {session.user?.name}! You can create a new event here.</p>
    </div>
  );
}
