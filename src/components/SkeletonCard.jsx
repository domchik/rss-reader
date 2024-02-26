

const SkeletonCard = () => {
    return (
        <div className="bg-gray-200 p-6 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-300 rounded-md w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded-md w-full mb-2"></div>
            <div className="h-3 bg-gray-300 rounded-md w-1/2"></div>
        </div>
    );
};

export default SkeletonCard;
