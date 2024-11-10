import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMediaUrl } from '../Action/action';

const CreateQuote = () => {

  const dispatch = useDispatch()
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
 
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !text) {
      alert('Please provide both image and text.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      alert('Image and Text uploaded successfully!');
      setLoading(false);
      setImage(null); 
      setText(''); 
      dispatch(getMediaUrl(image,text))
    }, 2000);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-center text-2xl font-bold mb-4">Upload Image and Text</h2>

      {image && (
        <div className="mb-4">
          <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-40 object-cover rounded-lg mb-2" />
        </div>
      )}

      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-700 py-2 px-4 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Enter text here"
          value={text}
          onChange={handleTextChange}
          rows="4"
          className="w-full text-sm text-gray-700 py-2 px-4 border border-gray-300 rounded-md"
        />
      </div>

      <button
        onClick={handleSubmit}
        className={`w-full py-2 px-4 text-white font-bold rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default CreateQuote;
