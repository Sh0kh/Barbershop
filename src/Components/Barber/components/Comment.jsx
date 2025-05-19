import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

export default function Comment({ data }) {
  const { ID } = useParams()
  const reviews = [
    { initial: "Р", name: "Рустам", rating: 5, date: "2 мая 2025", thumbsUp: true },
    { initial: "С", name: "Саида", rating: 5, date: "30 апреля 2025", thumbsUp: false },
    { initial: "Х", name: "Хумоён", rating: 5, date: "30 апреля 2025", thumbsUp: false },
    { initial: "Ш", name: "Шавкат", rating: 5, date: "29 апреля 2025", thumbsUp: false },
  ];
  const { t, i18n } = useTranslation();

  return (
    <div className="comment max-w-[100%] mt-[10px] mx-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h1 className="commet_h1">{t('otziv')}
      </h1>
      <NavLink to={`/barber/comment/${ID}`}>
        <div className=" flex items-center justify-center py-[10px] rounded-[10px] my-[20px] cursor-pointer bg-[black] text-[white]">
          {t('go-away')}
        </div>
      </NavLink>
      <div className="space-y-3">
        {data?.map((review, index) => (
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
              </div>
              <p className="text-xs text-gray-500">{review.name}</p>
              <p className="text-xs text-gray-500 my-[3px]">{review.comment}</p>
              <p className="text-xs text-gray-500">{review.created_at}</p>
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}