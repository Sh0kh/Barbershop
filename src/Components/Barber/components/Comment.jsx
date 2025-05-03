export default function Comment(){
    const reviews = [
        { initial: "Р", name: "Рустам", rating: 5, date: "2 мая 2025", thumbsUp: true },
        { initial: "С", name: "Саида", rating: 5, date: "30 апреля 2025", thumbsUp: false },
        { initial: "Х", name: "Хумоён", rating: 5, date: "30 апреля 2025", thumbsUp: false },
        { initial: "Ш", name: "Шавкат", rating: 5, date: "29 апреля 2025", thumbsUp: false },
      ];
    return(
        <div className="comment max-w-[100%] mt-[10px] mx-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h1 className="commet_h1">Отзывы
          </h1>
       <div className="commet_share">
       <h2 className="text-sm font-medium text-gray-700 mb-2 text-center">Оцените и оставьте отзыв</h2>
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-gray-300 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.5 3 1-5.5L2 8l5.5-1L10 2l2.5 5 5.5 1-3.5 4.5 1 5.5z" />
            </svg>
          ))}
        </div>
       </div>
  
        <div className="space-y-3">
          {reviews.map((review, index) => (
            <div key={index} className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold mr-2">
                {review.initial}
              </div>
  
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.5 3 1-5.5L2 8l5.5-1L10 2l2.5 5 5.5 1-3.5 4.5 1 5.5z" />
                      </svg>
                    ))}
                  </div>
                  {review.thumbsUp && (
                    <span className="ml-1 text-lg">👍</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{review.name}</p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
  
      
      </div>
    )
}