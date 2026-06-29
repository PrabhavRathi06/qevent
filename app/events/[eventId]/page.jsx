import Tag from "@/components/Tag";

async function getEvent(eventId) {
  const res = await fetch(
    `https://qevent-backend.labs.crio.do/events/${eventId}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }
  return res.json();
}

export default async function EventDetailPage({ params }) {
  const event = await getEvent(params.eventId);

  return (
    <div className="flex flex-col items-center px-6 py-10">
      <div className="max-w-4xl w-full">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-[350px] object-cover rounded-md shadow-lg mb-8"
        />

        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent">
          {event.name}
        </h1>
        <p className="text-lg text-gray-500 mt-1">{event.location}</p>
        <p className="text-lg text-gray-500">{event.artist}</p>

        <div className="flex gap-2 items-center mt-6 flex-wrap">
          {event.tags &&
            event.tags.map((tag) => <Tag text={tag} key={tag} />)}
        </div>

        <p className="mt-6 text-lg leading-relaxed">
          {event.description ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, cumque placeat architecto dolorem inventore ex eius recusandae quod perspiciatis voluptatum maxime porro soluta repellat tempore accusamus. Incidunt, iure laborum? Modi odio possimus dicta sapiente neque tempora corporis recusandae nostrum et, ipsam omnis laudantium sequi, hic dolore pariatur ad commodi autem. Consectetur similique quam deleniti, nobis ullam error quisquam ipsam culpa! Quaerat, enim dolor reprehenderit excepturi esse sit aspernatur non odit aliquid sunt nam in debitis consequatur blanditiis hic nostrum odio laudantium eum numquam magni veniam inventore nesciunt minus harum? Tempore dignissimos est impedit velit esse odit tenetur ratione laudantium quia!"}
        </p>

        <div className="flex justify-between items-center mt-8 mb-8">
          <h2 className="text-3xl font-bold text-orange-500">
            {event.price > 0
              ? `$${event.price.toLocaleString()}`
              : "FREE"}
          </h2>
          <button className="bg-red-500 text-white px-6 py-3 rounded-md font-medium hover:bg-red-600 transition-colors">
            Buy Tickets
          </button>
        </div>
      </div>
    </div>
  );
}
