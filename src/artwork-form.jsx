import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

const ArtworkForm = ({ artwork, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(artwork || {
    title: '',
    artist: '',
    year: '',
    category: '',
    description: '',
    imageUrl: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{artwork ? 'Edit Artwork' : 'Add New Artwork'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Artist
            </label>
            <input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="Painting">Painting</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Photography">Photography</option>
                <option value="Digital">Digital</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {artwork ? 'Update Artwork' : 'Add Artwork'}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ArtworkForm;
