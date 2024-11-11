import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMediaUrl } from '../Action/action';
import backArrow from '../images/back-arrow.jpg'
import { useNavigate } from 'react-router';

// CreateQuote page to let user create quote by uploading image and text
const CreateQuote = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate()

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
      alert('Quote created successfully!');
      setLoading(false);
      setImage(null);
      setText('');
      dispatch(getMediaUrl(image, text));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div onClick={()=>navigate('/homepage')} className='fixed left-2 top-5 px-3 cursor-pointer'><img width={'26px'} src={backArrow}/></div>
      <h1 className="text-3xl font-bold text-white mb-8">Create Your Own Quote</h1>

      <div className="max-w-md w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] bg-white rounded-lg shadow-lg p-8">

        {image && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
          </div>
        )}

        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
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
          className={`w-full py-2 px-4 text-white font-bold rounded-md ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Converting image to url...' : 'Upload'}
        </button>
      </div>
    </div>
  );
};

export default CreateQuote;
