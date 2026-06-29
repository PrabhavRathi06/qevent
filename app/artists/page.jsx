import ArtistCard from "@/components/ArtistCard";

async function getArtists() {
  const res = await fetch("https://qevent-backend.labs.crio.do/artists", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch artists");
  }
  return res.json();
}

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent">
        Artists
      </h1>
      <div className="flex flex-wrap justify-center">
        {artists.map((artistData) => (
          <ArtistCard artistData={artistData} key={artistData.name} />
        ))}
      </div>
    </div>
  );
}
