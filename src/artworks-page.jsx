// src/pages/Artworks.jsx
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Select } from './components/ui/select';
import { Modal } from './components/common/Modal';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { artworkService, categoryService } from './api-service';
import ArtworkForm from './artwork-form';

export default function Artworks() {
  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch artworks and categories when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artworksResponse, categoriesResponse] = await Promise.all([
          artworkService.getAllArtworks(),
          categoryService.getAllCategories(),
        ]);
        
        setArtworks(artworksResponse.data);
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (err) {
        // setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter artworks based on search term and category
  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || artwork.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleArtworkSubmit = async (artworkData) => {
    try {
      const response = await artworkService.createArtwork(artworkData);
      setArtworks([...artworks, response.data]);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Artworks</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Artwork
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          placeholder="Search artworks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>

      {/* Artworks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredArtworks.map(artwork => (
          <Card key={artwork.id}>
            <CardContent className="p-4">
              <img
                src={artwork.imageUrl || '/api/placeholder/300/200'}
                alt={artwork.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{artwork.title}</h3>
              <p className="text-gray-600">{artwork.artist}</p>
              <p className="text-sm text-gray-500">{artwork.year}</p>
              <div className="mt-2">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {artwork.category}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Artwork Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Artwork"
      >
        <ArtworkForm
          onSubmit={handleArtworkSubmit}
          onCancel={() => setIsModalOpen(false)}
          categories={categories}
        />
      </Modal>
    </div>
  );
}
