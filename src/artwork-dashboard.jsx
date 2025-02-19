import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';

const ArtworkDashboard = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // Example artwork data structure
  const sampleArtworks = [
    {
      id: 1,
      title: "The Starry Night",
      artist: "Vincent van Gogh",
      year: 1889,
      category: "Post-Impressionism",
      imageUrl: "/api/placeholder/300/200",
      description: "A night scene showing a village with a prominent church spire outlined against a night sky"
    },
    {
      id: 2,
      title: "Mona Lisa",
      artist: "Leonardo da Vinci",
      year: 1503,
      category: "Renaissance",
      imageUrl: "/api/placeholder/300/200",
      description: "Half-length portrait painting of a woman"
    }
  ];

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setArtworks(sampleArtworks);
      setLoading(false);
    }, 1000);
  }, []);

  const ArtworkCard = ({ artwork }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2">{artwork.title}</CardTitle>
        <div className="text-sm text-gray-600">
          <p>Artist: {artwork.artist}</p>
          <p>Year: {artwork.year}</p>
          <p>Category: {artwork.category}</p>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button 
            onClick={() => setSelectedArtwork(artwork)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            <Edit size={16} />
          </button>
          <button 
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Museum Collection</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          Add Artwork
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtworkDashboard;
