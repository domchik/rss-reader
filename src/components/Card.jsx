import React from 'react';

const Card = ({ title, description, link, image }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {image ? (
                <img src={image} alt={title} className="w-full mb-4 rounded" />
            ) : null}
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <a href={link} className="text-blue-600 underline">Read more</a>
        </div>
    );
};

export default Card;