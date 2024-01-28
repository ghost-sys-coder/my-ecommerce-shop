/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { CategorySkeleton } from "../skeletons";

const CategoryList = ({isLoading, categories}) => {
 
  return (
    <div className="hidden w-[200px] lg:flex flex-col justify-center gap-1 shadow-2xl bg-white rounded-md p-2">
      {isLoading ? (
        <CategorySkeleton />
      ) : (
          <>
            {categories.map(({category, _id, imgUrl}) => (
              <Link to={`categories/${category}/${_id}`} key={_id} className="flex gap-2 py-1 hover:text-theme-500">
                <img className="w-[25px] h-[25px] object-cover rounded-full overflow-hidden" src={imgUrl} alt={category} />
                <p className="text-[10px] font-semibold text-theme-700 hover:text-theme-500 hover:font-bold">{category}</p>
             </Link>
           ))} 
          </>
      )}
    </div>
  )
}

export default CategoryList